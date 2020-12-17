import {Component, Inject, OnInit} from '@angular/core';
import {filter, map, switchMap} from 'rxjs/operators';
import { CheckService, Person} from '../../srv/check.service';
import {getId} from '../../srv/heplers';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';

export interface DataTest {
  link: string;
  count: number;
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {


  constructor(private checkSrv: CheckService, public dialog: MatDialog) {
  }
  testPerson: Person = {
    token: 'pok',
  };
  links$: any[] = [];

  ngOnInit(): void {
  }
  check(): void {
    this.checkSrv.get(this.testPerson).subscribe((links) => {
      this.links$ = Object.keys(links);
      console.log(this.links$);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SubDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const fireball: DataTest = {
          link: result,
          count: 0
        };
        this.checkSrv.create(this.testPerson, fireball).subscribe((res) => {
          console.log(res);
        });
      }

    });
  }

  onDelete(link: any): void {
    this.checkSrv.remove(this.testPerson, link).subscribe((res) => {
      console.log(res);
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sub-dialog-component',
  template: `
    <h1 mat-dialog-title></h1>
    <div mat-dialog-content>
      <p>enter chto-to?</p>
      <mat-form-field>
        <mat-label>eshe chto-to</mat-label>
        <input matInput [(ngModel)]="data.link">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.link">Ok</button>
    </div>`,
})
export class SubDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SubDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTest) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
