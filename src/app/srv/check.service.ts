import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


export interface Person {
  link: string;
  count: number;
}

export interface AnswerPerson {
  [key: string]: Person;
}

@Injectable({providedIn: 'root'})
export class CheckService {
  static url = 'https://redirector-3f090-default-rtdb.firebaseio.com/person';

  constructor(private http: HttpClient) {
  }


  check(person: Person): Observable<AnswerPerson | false> {
    return this.http
      .get<AnswerPerson>(`${CheckService.url}/${person.link}.json`)
      .pipe(map(response => {
        if (!response) {
          return false;
        }
        return response;
      }));
  }

  create(person: Person): Observable<Person> {
    return this.http
      .post<Person>(`${CheckService.url}/${person.link}.json`, person);

  }

  increaseCount(person: Person, id: string): Observable<Person> {
    let count = +person.count;
    count++;
    return this.http.patch<Person>(`${CheckService.url}/${person.link}/${id}.json`, {
      ...person,
      count
    });
  }
}
