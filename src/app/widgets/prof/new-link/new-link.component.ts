import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ILink} from '../../../model/link';

@Component({
  selector: 'app-link-dialog-component',
  template: `
    <div class="wrap">
      <h1 class="h1-style" mat-dialog-title>Заполните форму</h1>
      <div mat-dialog-content>
        <mat-form-field class="inp">
          <input type="text" matInput [(ngModel)]="data.title" name="title" #title="ngModel" required>
          <mat-hint>Это будет короткой ссылкой на Ваш канал</mat-hint>
        </mat-form-field>
        <br>
        <mat-form-field class="inp">
          <mat-placeholder>URL</mat-placeholder>
          <mat-hint>Введите адрес Telegram канала</mat-hint>
          <input type="text" matInput [(ngModel)]="data.url" name="link" #link="ngModel" required>
        </mat-form-field>
        <div class="inp-wrap">
          <label class="btn btn-primary">
            <i class="fa fa-image"></i>Загрузите фоновое изображение<input required type="file" class="margin-input" style="display: none;"
                                                                   (change)="backgroundUpload($event)">
          </label>
        </div>
        <div class="preview">
          <br>
          <br>
          <mat-hint>Это будет короткой ссылкой на Ваш канал</mat-hint>
          <h2>teleg-on.online/{{data.title}}</h2> <img [src]=data.img>
        </div>
        <div mat-dialog-actions class="act">
          <button mat-button (click)="onNoClick()">Отмена</button>
          <button mat-button [mat-dialog-close]="data" [disabled]="!link.control.value || !title.control.value || !data.img">Создать
          </button>
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
      margin-top: 30px;
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
