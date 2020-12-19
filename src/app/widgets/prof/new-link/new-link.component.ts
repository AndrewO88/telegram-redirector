import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ILink} from '../../../model/link';

@Component({
  selector: 'app-link-dialog-component',
  template: `
    <div class="wrap">
      <h1 mat-dialog-title>Введите название ссылки</h1>
      <div mat-dialog-content>
        <mat-form-field class="inp">
          <mat-label *ngIf="link.errors?.url">не верный формат ссылки</mat-label>
          <input type="text" matInput [(ngModel)]="data.url" name="link" #link="ngModel" required url>
        </mat-form-field>
        <div class="inp-wrap">
          <input class="margin-input" type="file" (change)="handleUpload($event)">
        </div>
      </div>
      <div mat-dialog-actions class="act">
        <button mat-button (click)="onNoClick()">Отмена</button>
        <button mat-button [mat-dialog-close]="data" [disabled]="!link.control.value || link.errors?.url">Создать</button>
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

  handleUpload(event: any): void {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.img = reader.result as string;
    };
  }
}
