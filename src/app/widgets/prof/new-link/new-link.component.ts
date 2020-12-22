import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ILink} from '../../../model/link';

@Component({
  selector: 'app-link-dialog-component',
  template: `
    <div class="wrap">
      <h1 class="h1-style" mat-dialog-title>Введите имя пользователя</h1>
      <div mat-dialog-content>
        <mat-form-field class="inp">
          <mat-placeholder>alias</mat-placeholder>
          <input type="text" matInput [(ngModel)]="data.title" name="title" #link="ngModel" required>
        </mat-form-field>
        <mat-form-field class="inp">
          <mat-placeholder>URL</mat-placeholder>
          <input type="text" matInput [(ngModel)]="data.url" name="link" #link="ngModel" required>
        </mat-form-field>
        <div class="inp-wrap">
          <input class="margin-input" type="file" (change)="backgroundUpload($event)">
        </div>
      </div>
      <div mat-dialog-actions class="act">
        <button mat-button (click)="onNoClick()">Отмена</button>
        <button mat-button [mat-dialog-close]="data" [disabled]="!link.control.value">Создать</button>
      </div>
    </div>
  `,
  styles: [`
    .inp {
      width: 100% !important;
    }

    .wrap {
      display: flex;
      flex-direction: column;
      align-content: center;
      text-align: center;
    }

    .h1-style {
      font-size: 16px;
      margin-bottom: 0;
    }

    .act {
      display: flex;
      justify-content: space-between;
    }

    .inp-wrap {
      padding: 2px;
      border: 1px solid #3365ea;
      border-radius: 5px;
    }
  `]
})
export class NewLinkComponent {
  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILink) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  backgroundUpload(event: any): void {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.img = reader.result as string;
    };
  }
}
