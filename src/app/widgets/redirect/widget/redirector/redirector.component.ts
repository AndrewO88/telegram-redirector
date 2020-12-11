import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {interval, Observable} from 'rxjs';
import {finalize, map, startWith, take} from 'rxjs/operators';

@Component({
  selector: 'app-redirector',
  template: `
    <div class="redirector">

      <div class="link">
        <div>
          <a mat-raised-button class="link-anchor" color="accent" [href]="redirectLink">
            Перейти в Telegram!<br>
          </a>
        </div>
        <span *ngIf="timer$ | async as timer">переадресация через ({{timer}})</span>
      </div>

      <mat-card class="info">
        <p><span class="text-color1">Что сейчас должно произойти?</span></p>
        <p>открыта ссылка на канал в приложении <strong><a href="https://tlgrm.ru"
                                                           target="_blank"><span class="text-color1">Telegram</span></a></strong>
        </p>
        <p><span class="text-color2">Если ничего не произошло, значит у Вас нет установленного приложения <a
          href="https://tlgrm.ru" target="_blank">Telegram</a> - скачать его можно <a href="https://tlgrm.ru"
                                                                                      target="_blank">здесь</a></span>
        </p>
      </mat-card>
    </div>

  `,
  styleUrls: ['./redirector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectorComponent {

  @Input() redirectLink: SafeUrl | undefined;

  timer$: Observable<number> = interval(1000).pipe(
    startWith(-1),
    take(3),
    map(x => 1 - x),
    finalize(() => this.redirect)
  );

  redirect(): void {
    if (!!this.redirectLink) {
      setTimeout(() => {
        window.location.replace((this.redirectLink as any).changingThisBreaksApplicationSecurity);
      });
    }
  }


}
