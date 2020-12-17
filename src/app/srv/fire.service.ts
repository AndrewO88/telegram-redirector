import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PersonTest} from '../widgets/prof/prof.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersons(token: string): Observable<PersonTest[]> {
    return this.firestore.collection(`persons/${token}/links`).snapshotChanges().pipe(
      map((data) => {
        return data.map(person => {
          console.log('2', person);
          return {
            id: person.payload.doc.id,
            link: person.payload.doc.data().link
          } as PersonTest;
        });
      })
    );
  }

  createPerson(person: PersonTest) {
    return this.firestore.collection('persons').add(person);
  }

  updatePerson(person: PersonTest) {
    this.firestore.doc('persons/' + person.id).update(person).then(r => console.log(r));
  }

  deletePerson(personId: string, token: string) {
    this.firestore.doc(`persons/${token}/links/${personId}`).delete().then(r => console.log(r));
  }
}
