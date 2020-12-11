import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-receiver',
  template: `
    <div *ngIf="isReceiver" class="receive">
      <img class="img" src="assets/img/img.png" alt="Smart Link!"/>
      <h1 class="title">Генерация ссылки</h1>
      <div class="sub-title">
        Введите ссылку в формате t.me/login или @login
      </div>
      <div class="input-container">
        <mat-form-field
          appearance="outline"
          color="primary"
        >
          <mat-label>t.me/.. telegra.ph/..</mat-label>
          <input [(ngModel)]="inputUrl" #inputRef matInput placeholder="t.me/.." required autofocus>
        </mat-form-field>
        <button class="copy" [cdkCopyToClipboard]="!!inputUrl ? inputUrl : ''" mat-icon-button aria-label="Скопировать в буффер обмена">
          <mat-icon class="icon">file_copy</mat-icon>
        </button>

      </div>
      <div class="button-container">
        <button
          mat-raised-button
          (click)="handleUrl()"
        >
          Получить адрес
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./receiver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiverComponent {
  @Input() isReceiver = true;
  inputUrl: string | undefined;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  handleUrl(): void {
    new Promise<string>((resolve, reject) => {
      let url = this.inputUrl;

      if (!url) {
        reject('Error');
      } else {
        if (url?.match(/^[a-zA-Z\?=\d_-]+$/)) {
          return resolve('https://' + window.location.host + '/' + url);
        }
        url = url
          .replace(/.*t\.me/, 'https://' + window.location.host)
          .replace('http://', 'https://')
          .replace('@', 'https://' + window.location.host + '/');

        resolve(url);
      }


    }).then((url) => {
      this.setValue(url);
    });
  }

  setValue(val: string): void {
    this.inputUrl = val;
  }

  transform(value: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}





