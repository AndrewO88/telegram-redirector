import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IPerson, Person} from '../../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonResolverService implements Resolve<IPerson> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPerson> {
    return of(new Person('dvach', 'DVACH NAME', []));
  }
}
