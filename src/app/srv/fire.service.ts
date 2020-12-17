import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Link} from '../widgets/prof/prof.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocumentReference} from '@angular/fire/firestore/interfaces';


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
