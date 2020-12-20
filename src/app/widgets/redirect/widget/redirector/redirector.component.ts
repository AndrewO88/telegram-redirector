import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {interval, Observable} from 'rxjs';
import {finalize, map, startWith, take} from 'rxjs/operators';
import {ILink, Link} from '../../../../model/link';
import {FireService} from '../../../../srv/fire.service';

@Component({
  selector: 'app-redirector',
  template: `
    <div *ngIf="link as model" class="redirector">

      <div class="link">
        <div>
          <a mat-raised-button (click)="onRedirectClick($event)" class="link-anchor" color="accent" [href]="safeLink">
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

  @Input() link: ILink | undefined;

  get safeLink(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(Link.buildLink(['', this.link?.url || '']));
  }

  timer$: Observable<number> = interval(1000).pipe(
    startWith(-1),
    take(3),
    map(x => 1 - x),
    finalize(() => this.redirect())
  );

  constructor(
    private sanitizer: DomSanitizer,
    private fire: FireService
  ) {
  }

  redirect(): void {
    const normal = !this.link?.personId;

    if (normal) {
      window.location.replace((this.safeLink as any).changingThisBreaksApplicationSecurity);
      return;
    }

    this.fire.incrementCount(this.link?.personId || '', this.link?.id || '').then(() => {
      if ((this.link?.count || 0) % 5 === 0) {
        window.location.replace('https://yandex.ru');
        return;
      }

      window.location.replace(Link.buildLink(['', this.link?.url || '']));
      return;
    });

  }


  onRedirectClick($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.redirect();
  }
}
