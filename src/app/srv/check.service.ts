import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


export interface Person {
  id: string;
  date?: string;
}
interface CreateResponse {
  id: string;
}

@Injectable({providedIn: 'root'})
export class CheckService {
  static url = 'https://redirector-3f090-default-rtdb.firebaseio.com/person';

  constructor(private http: HttpClient) {
  }


  check(person: Person): Observable<Person | false> {
    return this.http
      .get<Person>(`${CheckService.url}/${person.id}.json`)
      .pipe(map(response => {
        if (!response) {
          return false;
        }
        return response;
      }));
  }

  load2(person: Person): Observable<Person[]> {
    console.log('lel');
    return this.http
      .get<Person[]>(`${CheckService.url}/${person}.json`)
      .pipe(map(response => {
        if (!response) {
          console.log(response);
          return [];
        }
        console.log(response);
        return response;
      }));
  }

  load(person: Person): Observable<Person> {
    return this.http
      .post<CreateResponse>(`${CheckService.url}/${person.id}.json`, person);

  }

}
