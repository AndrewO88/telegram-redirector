import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IPerson} from '../model/person';
import {FireService} from './fire.service';

@Injectable({providedIn: 'root'})
export class LinkResolver implements Resolve<IPerson> {
  constructor(private service: FireService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.allLinks();
  }
}
