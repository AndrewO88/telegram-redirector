import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, startWith} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor(
    private http: HttpClient
  ) {
  }

  membersCount$ = (channel: string): Observable<any> => this.getMembersCount(channel).pipe(
    startWith(null),
    filter((x) => !!x)
  );


  // tslint:disable-next-line:typedef
  private getMembersCount(channel: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.get(`https://api.teleg-on.online/?channel=${channel}`, {
      headers
    });
  }

}
