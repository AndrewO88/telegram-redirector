import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Link} from '../prof.component';

@Component({
  selector: 'app-link-dialog-component',
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
export class NewLinkComponent {
  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Link) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
