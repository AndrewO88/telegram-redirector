import {Injectable} from '@angular/core';
import {AngularFirestore, QueryDocumentSnapshot, SnapshotOptions} from '@angular/fire/firestore';
import {Link} from '../widgets/prof/prof.component';
import {Observable} from 'rxjs';
import {map, mapTo, tap} from 'rxjs/operators';
import {DocumentReference} from '@angular/fire/firestore/interfaces';

// Firestore data converter
const linkConverter = {
  toFirestore: (link: Link) => {
    return {
      name: link.link,
      count: link.count,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<any>, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return {
      name: data.link,
      count: data.count,
    };
  }
};

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersonLinks(personId: string): Observable<Link[]> {
    return this.firestore.collection(`persons/${personId}/links`).snapshotChanges().pipe(
      map<any, Link[]>((data) => data.map((link: any) => ({
        ...link.payload.doc.data() as object,
        id: link.payload.doc.id,
      })))
    );
  }

  createPerson(link: Partial<Link>, personId: string): Promise<DocumentReference<any>> {
    return this.firestore.collection(`persons/${personId}/links`).add(link);
  }

  deletePerson(linkId: string, personId: string): Promise<void> {
    return this.firestore.doc(`persons/${personId}/links/${linkId}`).delete();
  }
}
