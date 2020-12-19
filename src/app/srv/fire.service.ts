import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
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
      // tap((data) => console.log('2.', data)),

      map<any, ILink[]>((data) => data.map((link: any) => ({
        ...link.payload.doc.data() as object,
        id: link.payload.doc.id,
      }))),

      // tap((data) => console.log('3.', data)),
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
