import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FireService} from '../../srv/fire.service';
import {Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NewLinkComponent} from './new-link/new-link.component';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {IPerson} from '../../model/person';
import {ILink, Link, TableColumns} from '../../model/link';


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfComponent implements OnInit, OnDestroy {

  person$: Observable<IPerson> | undefined;
  displayedColumns: TableColumns<Link> = ['id', 'url', 'count', 'actions'];

  private subscriptions: Subscription[] = [];

  constructor(
    private pService: FireService,
    private dialog: MatDialog,
    private routes: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.person$ = this.routes.data.pipe(map((response) => response.persone));
  }

  create(personId: string): void {
    const dialogRef = this.dialog.open(NewLinkComponent, {
      data: {}
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((response: Partial<ILink>) => {
        if (response) {
          const link = new Link('', response.url || '', 0, response.img || '');
          this.pService.createPerson(link, personId).then(undefined);
        }
      })
    );
  }

  delete(linkId: string, personId: string): void {
    if (!linkId || !personId) {
      return;
    }

    this.pService.deletePerson(linkId, personId).then(undefined);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
