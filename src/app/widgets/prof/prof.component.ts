import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {FireService} from '../../srv/fire.service';
import {Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NewLinkComponent} from './new-link/new-link.component';


export interface Link {
  id: string;
  count: number;
  link: string;
}


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfComponent implements OnDestroy {
  @Input() userId = 'dvach';
  links$: Observable<Link[]>;
  displayedColumns: string[] = ['link', 'count', 'actions'];

  private subscriptions: Subscription[] = [];

  constructor(
    private pService: FireService,
    private dialog: MatDialog
  ) {
    this.links$ = this.pService.getPersonLinks(this.userId);
  }


  create(): void {
    const dialogRef = this.dialog.open(NewLinkComponent, {
      data: {}
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((link) => {
        if (link) {
          const newLink: Partial<Link> = {
            link,
            count: 0
          };

          this.pService.createPerson(newLink, this.userId).then(undefined);
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
