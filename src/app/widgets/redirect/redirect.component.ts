import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ILink, Link} from '../../model/link';
import {TelegramService} from '../../srv/telegram.service';
import {take} from 'rxjs/operators';

interface ViewModel {
  isReceive: boolean;
  rootPathname: string;
  currentPathname: string;
  link: ILink;
  isRegistered: boolean;
}

@Component({
  selector: 'app-redirect',
  template: `
    <div class="redirect-container">
      <div class="w">
        <ng-container *ngIf="viewModel as view">

          <ng-container *ngIf="view.isReceive; else forward">
            <div class="tabs-wrap">
              <mat-tab-group animationDuration="0ms" mat-align-tabs="center">
                <mat-tab label="Без регистрации">
                  <div *ngIf="viewModel as view">
                    <app-receiver></app-receiver>
                  </div>
                </mat-tab>
                <mat-tab label="С регистрацией">
                  <div class="form">
                    <div class="pay">
                      <div class="pay__title">Для ваших каналов *</div>
                      <div class="pay__info">Приглашайте своих подписчиков по красивой ссылке без ограничений</div>
                      <div class="pay__benefits">
                        <div class="pay-item">
                          <div class="pay-item__icon pay-item__icon_1"></div>
                          <div class="pay-item__text">Мощнейшая статистика от Яндекс.Метрики</div>
                        </div>
                        <div class="pay-item">
                          <div class="pay-item__icon pay-item__icon_2"></div>
                          <div class="pay-item__text">Установка вашего фона и логотипа</div>
                        </div>
                        <div class="pay-item">
                          <div class="pay-item__icon pay-item__icon_3"></div>
                          <div class="pay-item__text">Стоимость —<br>навсегда бесплатно</div>
                        </div>
                      </div>
                      <a class="pay__button" href="/registration">Подключить</a>
                      <div class="pay__demo">* Для открытых каналов подключение происходит в автоматическом режиме,<br> для подключения
                        приватных каналов напишите нам в <a href="tg://resolve?domain=dmitry_mng" target="_blank">Telegram</a>. <br>Так же
                        есть функция <a href="#short">короткой ссылки</a> для приватных каналов.<br> Все услуги предоставляются бесплатно.
                      </div>
                    </div>

                  </div>
                </mat-tab>
              </mat-tab-group>
            </div>
          </ng-container>

          <ng-template #forward>
            <app-redirector [link]="view.link"></app-redirector>
          </ng-template>

        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectComponent implements OnInit {

  viewModel: ViewModel | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private tg: TelegramService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._initModel();
    this._getDataFromTgPage(this.viewModel?.link);
  }

  private _initModel(): void {
    const currentPathname = location.pathname;
    const info = currentPathname.split('/');
    const links: ILink[] = this.route.snapshot.data.links ?? [];
    const link = links.find(l => l.title === info[1]);
    const isRegistered = !!link;
    this.viewModel = {
      isReceive: !info.filter(part => !!part).length,
      currentPathname: location.pathname,
      rootPathname: '/',
      link: link ?? new Link('', '', Link.buildLink(info), 0, undefined, ''),
      isRegistered
    };

  }

  private _getDataFromTgPage(link: Link | undefined): void {
    if (!link) {
      return;
    }
    const channel = link.getChannelFromLinkUrl();

    if (channel) {
      this.tg.membersCount$(channel).pipe(take(1)).subscribe((info) => {
        if (this.viewModel?.link) {
          this.viewModel = {
            ...this.viewModel,
            link: {
              ...this.viewModel.link,
              subscribers: info?.count || 0,
              logo: info?.imgSrc || ''
            }
          };
          this.cdr.detectChanges();
        }
      });
    }
  }

}
