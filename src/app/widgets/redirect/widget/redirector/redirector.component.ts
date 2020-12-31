import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {interval, Observable} from 'rxjs';
import {finalize, map, startWith, take} from 'rxjs/operators';
import {ILink, Link} from '../../../../model/link';
import {FireService} from '../../../../srv/fire.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-redirector',
  template: `
    <div *ngIf="link as model" class="redirector" [style.background-image]="'url('+model?.img+')'">

      <div class="examples-list">
        <div class="example">
          <div *ngIf="model.logo; else nologo" class="example-image"><img class="example-image__src"
                                                                          src="{{model.logo}}">
          </div>
          <div class="example-title">{{model?.title}}</div>
          <!--          <div *ngIf="model.count" class="example-info">Более <span>{{model.count}} </span>переходов</div>-->
          <div *ngIf="model.count" class="example-info"><br/></div>
          <a class="example-link" (click)="onRedirectClick($event)">Перейти в Telegram</a></div>
      </div>
      <ng-template #nologo>
        <div class="example-image"><img class="example-image__src"
                                        src="/assets/images/Telegram_logo.svg"></div>
      </ng-template>
      <!--      <div class="link">-->
      <!--        <div>-->
      <!--          <a mat-raised-button (click)="onRedirectClick($event)" class="link-anchor" color="accent" [href]="safeLink">-->
      <!--            Перейти в Telegram!<br>-->
      <!--          </a>-->
      <!--        </div>-->
      <!--        <span *ngIf="timer$ | async as timer">переадресация через ({{timer}})</span>-->
      <!--      </div>-->

      <!--      <mat-card *ngIf="!model?.img" class="info">-->
      <!--        <p><span class="text-color1">Что сейчас должно произойти?</span></p>-->
      <!--        <p>открыта ссылка на канал в приложении <strong><a href="https://tlgrm.ru"-->
      <!--                                                           target="_blank"><span class="text-color1">Telegram</span></a></strong>-->
      <!--        </p>-->
      <!--        <p><span class="text-color2">Если ничего не произошло, значит у Вас нет установленного приложения <a-->
      <!--          href="https://tlgrm.ru" target="_blank">Telegram</a> - скачать его можно <a href="https://tlgrm.ru"-->
      <!--                                                                                      target="_blank">здесь</a></span>-->
      <!--        </p>-->
      <!--      </mat-card>-->
    </div>

  `,
  styleUrls: ['./redirector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectorComponent implements OnInit {

  @Input() link: ILink | undefined;
  urlPath = '';

  get safeLink(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.link?.url || '');
  }

  timer$: Observable<number> = interval(1000).pipe(
    startWith(-1),
    take(3),
    map(x => 1 - x),
    finalize(() => this.redirect())
  );

  constructor(
    private sanitizer: DomSanitizer,
    private fire: FireService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.urlPath = this.route.snapshot.url[0].path;
    const pageTitle = this.link?.title + '' || this.urlPath;
    const ym = (window as any).ym;

    this.titleService.setTitle(pageTitle);
    ym(70790716, 'hit', this.urlPath, {title: pageTitle});
  }

  redirect(): void {
    const normal = !this.link?.personId;

    if (normal) {
      window.location.replace((this.safeLink as any).changingThisBreaksApplicationSecurity);
      return;
    }

    this.fire.incrementCount(this.link?.personId || '', this.link?.id || '').then(() => {
      // if ((this.link?.count || 0) + 1 % 5 === 0) {
      //   window.location.replace('https://yandex.ru');
      //   return;
      // }

      if (this.link?.url) {
        const link = this.link?.url.slice(12, this.link?.url?.length);
        window.location.replace(Link.buildLink(link?.split('/')));
      }

      return;
    });

  }


  onRedirectClick($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.redirect();
  }
}
