import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ILink} from '../../../model/link';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';

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
          <mat-hint>Это будет короткой ссылкой на Ваш канал</mat-hint>
          <h2 (click)="copyTo($event, 'https://teleg-on.online/' + data.title)">
            <mat-icon class="icon">file_copy</mat-icon>teleg-on.online/{{data.title}}</h2>
          <img [src]=data.img alt="">
        </div>
        <div mat-dialog-actions class="act">
          <button mat-button (click)="onNoClick()">Отмена</button>
          <button mat-button [mat-dialog-close]="data" [disabled]="!link.control.value || !title.control.value || !data.img">Создать
          </button>
        </div>
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

    .mat-dialog-content {
    }
  `]
})
export class NewLinkComponent {
  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILink,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {
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
