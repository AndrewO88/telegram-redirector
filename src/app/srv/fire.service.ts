import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {filter, map, mergeMap, switchMap, take, toArray} from 'rxjs/operators';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {ILink, Link} from '../model/link';
import {IPerson} from '../model/person';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersonLinks(personId: string | undefined): Observable<ILink[]> {
    return this.firestore.collection(`persons/${personId}/links`).snapshotChanges().pipe(
      switchMap((list) => from(list).pipe(
        filter((response) => !!response?.payload?.doc?.id && !!response?.payload?.doc?.data()),
        filter((response) => {
          const nativeLinkObject: any = response.payload.doc.data();
          const {title, url} = nativeLinkObject;

          return !!title || !!url;
        }),
        map((response) => {
          const nativeLinkObject: ILink = response.payload.doc.data() as any;
          const linkId = response.payload.doc.id;
          const {title, url, count, img} = nativeLinkObject;
          return new Link(linkId, title, url, count ?? 0, personId, img);
        }),
        toArray()
      )),
    );
  }

  incrementCount(personId: string, linkId: string): Promise<void> {
    return this.firestore.collection('persons').doc(personId).collection('links').doc(linkId).get().toPromise().then((doc) => {
      const count = doc.data()?.count + 1;
      const linkRef = this.firestore.collection('persons').doc(personId).collection('links').doc(linkId);

      return linkRef.update({
        count
      });
    });
  }

  getAllPersons(): Observable<IPerson[]> {
    return this.firestore.collection<IPerson>(`persons`).valueChanges().pipe(
      take(1)
    );
  }

  allLinks(): Observable<ILink[]> {
    return this.getAllPersons().pipe(
      filter(x => !!x),
      switchMap((persons) => from(persons).pipe(
        mergeMap((person) => this.getPersonLinks(person.id).pipe(take(1))),
        toArray(),
        map((res) => res.flat())
      )),
    );
  }

  getPersonById(personId: string): Observable<IPerson> {
    return this.firestore.collection(`persons`).doc(personId).valueChanges().pipe(
      filter<any>((person) => !!person),
      switchMap<Partial<IPerson>, Observable<IPerson>>((person) => this.getPersonLinks(person.id).pipe(
        map((links) => ({
          ...person,
          links
        } as IPerson))
      ))
    );
  }

  createLink(link: Partial<ILink>, personId: string): Promise<DocumentReference<any>> {
    return this.firestore.collection(`persons/${personId}/links`).add({...link});
  }

  deleteLink(linkId: string, personId: string): Promise<void> {
    return this.firestore.doc(`persons/${personId}/links/${linkId}`).delete();
  }
}
