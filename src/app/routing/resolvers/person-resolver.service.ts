import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Link} from '../../widgets/prof/prof.component';
import {Observable, of} from 'rxjs';

interface Person {
  id: string;
  name: string;
  links: Link[];
}

@Injectable({
  providedIn: 'root'
})
export class PersonResolverService implements Resolve<Person> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person> | Promise<Person> | Person {
    return of({
      id: 'dvach',
      name: 'DVACH',
      links: []
    });
  }
}
