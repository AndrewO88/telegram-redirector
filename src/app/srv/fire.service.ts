import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {ILink} from '../model/link';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersonLinks(personId: string): Observable<ILink[]> {
    return this.firestore.collection(`persons/${personId}/links`).snapshotChanges().pipe(
      map<any, ILink[]>((data) => data.map((link: any) => ({
        ...link.payload.doc.data() as object,
        id: link.payload.doc.id,
      })))
    );
  }

  createPerson(link: Partial<ILink>, personId: string): Promise<DocumentReference<any>> {
    return this.firestore.collection(`persons/${personId}/links`).add(link);
  }

  deletePerson(linkId: string, personId: string): Promise<void> {
    return this.firestore.doc(`persons/${personId}/links/${linkId}`).delete();
  }
}
