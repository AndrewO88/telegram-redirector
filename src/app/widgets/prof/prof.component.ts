import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FireService} from '../../srv/fire.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NewLinkComponent} from './new-link/new-link.component';
import {ActivatedRoute} from '@angular/router';
import {IPerson} from '../../model/person';
import {ILink, Link, TableColumns} from '../../model/link';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfComponent implements OnInit, OnDestroy {

  person: IPerson | undefined;
  displayedColumns: TableColumns<Link> = ['title', 'count', 'metrics', 'actions'];

  private subscriptions: Subscription[] = [];

  constructor(
    private pService: FireService,
    private dialog: MatDialog,
    private routes: ActivatedRoute,
    private crd: ChangeDetectorRef,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const personId = Object.keys(this.routes.snapshot.queryParams)[0];

    if (personId) {
      this.pService.getPersonById(personId).subscribe((person) => {
        this.person = person;
        this.crd.detectChanges();
      });
    }

  }

  create(personId: string): void {
    const dialogRef = this.dialog.open(NewLinkComponent, {
      data: {},
      height: '500px',
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((response: ILink) => {
        if (response) {
          const link = new Link('', response.title, response.url, 0, response?.img);
          this.pService.createLink(link, personId).then(undefined);
        }
      })
    );
  }

  delete($event: MouseEvent, linkId: string, personId: string): void {
    $event.stopPropagation();
    $event.preventDefault();

    if (!linkId || !personId) {
      return;
    }

    this.pService.deleteLink(linkId, personId).then(undefined);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  copyTo($event: MouseEvent, value: string): void {
    $event.stopPropagation();
    $event.preventDefault();

    const pending = this.clipboard.beginCopy(value);

    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        this.snackBar.open('Скопировано в буфер обмена!', 'Ok', {
          duration: 3000,
        });
        pending.destroy();
      }
    };
    attempt();
  }
}
