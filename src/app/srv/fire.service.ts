import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {filter, map, mergeMap, switchMap, take, tap, toArray} from 'rxjs/operators';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {ILink} from '../model/link';
import {IPerson, Person} from '../model/person';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersonLinks(personId: string | undefined): Observable<ILink[]> {
    return this.firestore.collection(`persons/${personId}/links`).snapshotChanges().pipe(
      map<any, ILink[]>((data) => data.map((link: any) => ({
        ...link.payload.doc.data() as object,
        id: link.payload.doc.id,
        personId
      }))),
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
        mergeMap(x => x)
      )),
      tap((data) => console.log('3.', data)),
    );
  }

  getPersonById(personId: string): Observable<IPerson> {
    return this.firestore.collection(`persons`).doc(personId).valueChanges().pipe(
      // tap((data) => console.log('1.', data)),
      filter<any>((person) => !!person),
      switchMap<Partial<IPerson>, Observable<IPerson>>((person) => this.getPersonLinks(person.id).pipe(
        map((links) => ({
          ...person,
          links
        } as IPerson))
      )),
      // tap((data) => console.log('4.', data)),
    );
  }

  createLink(link: Partial<ILink>, personId: string): Promise<DocumentReference<any>> {
    return this.firestore.collection(`persons/${personId}/links`).add({...link});
  }

  deleteLink(linkId: string, personId: string): Promise<void> {
    return this.firestore.doc(`persons/${personId}/links/${linkId}`).delete();
  }
}
