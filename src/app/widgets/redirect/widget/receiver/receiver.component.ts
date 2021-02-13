import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-receiver',
  template: `
    <div *ngIf="isReceiver" class="receive form">
      <div class="free">
        <h1 class="free__title">Переадресация в Telegram</h1>
        <div class="free__info">На паблики, профили, чаты, сообщения, стикеры в Telegram</div>
        <div class="free__text">
          <input [(ngModel)]="inputUrl" class="free__input" placeholder="Вставьте ссылку t.me" type="text">
          <a class="free__button" (click)="handleUrl($event)" href="#">Получить ссылку</a></div>
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

  handleUrl($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();

    new Promise<string>((resolve, reject) => {
      let url = this.inputUrl;

      if (!url) {
        // reject('Error');
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
