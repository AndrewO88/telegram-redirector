import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Link} from '../prof.component';

@Component({
  selector: 'app-link-dialog-component',
  template: `
    <div class="wrap">
      <h1 mat-dialog-title>Введите название ссылки</h1>
      <div mat-dialog-content>
        <mat-form-field class="inp">
          <mat-label>название ссылки</mat-label>
          <input matInput [(ngModel)]="data.link">
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="act">
        <button mat-button (click)="onNoClick()">Отмена</button>
        <button mat-button [mat-dialog-close]="data.link">Создать</button>
      </div>
    </div>
  `,
  styles: [`
    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
    }
    .inp {
      display: flex;
      justify-content: center;
    }
    .act {
      display: flex;
      justify-content: space-between;
    }
  `]
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
