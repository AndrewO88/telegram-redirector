import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataTest, Link} from '../widgets/profiles/profiles.component';

export interface Person {
  token: string;
}

@Injectable({providedIn: 'root'})
export class CheckService {
  static url = 'https://redirector-3f090-default-rtdb.firebaseio.com/person';

  constructor(private http: HttpClient) {
  }


  get(person: Person): Observable<{ [key: string]: Link }> {
    return this.http.get<{ [key: string]: Link }>(`${CheckService.url}/${person.token}.json`);
  }

  create(person: Person, data: DataTest): Observable<Person> {
    return this.http
      .post<Person>(`${CheckService.url}/${person.token}.json`, data);

  }

  remove(person: Person, id: string): Observable<Person> {
    console.log(person);
    console.log(id);
    return this.http
      .delete<Person>(`${CheckService.url}/${person.token}/${id}.json`);
  }

  // increaseCount(person: Person, id: string): Observable<Person> {
  //   let count = +person.count;
  //   count++;
  //   return this.http.patch<Person>(`${CheckService.url}/${person.token}/${id}.json`, {
  //     ...person,
  //     count
  //   });
// }
}
