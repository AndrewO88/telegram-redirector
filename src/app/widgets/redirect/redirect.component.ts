import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {buildLink} from './helpers';

interface ViewModel {
  isReceive: boolean;
  rootPathname: string;
  currentPathname: string;
  redirectLink: SafeUrl;
}

@Component({
  selector: 'app-redirect',
  template: `
    <div class="redirect-container">

      <div class="tabs-wrap">
        <mat-tab-group animationDuration="0ms" mat-align-tabs="center">
          <mat-tab label="Без регистрации">
            <div *ngIf="viewModel as view">

              <ng-container *ngIf="view.isReceive; else forward">
                <app-receiver></app-receiver>
              </ng-container>

              <ng-template #forward>
                <app-redirector [redirectLink]="view.redirectLink"></app-redirector>
              </ng-template>

            </div>
          </mat-tab>
          <mat-tab label="С регистрацией">

          </mat-tab>
        </mat-tab-group>
      </div>


    </div>
  `,
  styleUrls: ['redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectComponent implements OnInit {

  viewModel: ViewModel | undefined;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this._initModel();
  }

  private _initModel(): void {
    const currentPathname = location.pathname;
    const info = currentPathname.split('/');

    this.viewModel = {
      isReceive: true,
      // isReceive: !info.filter(part => !!part).length,
      currentPathname: location.pathname,
      rootPathname: '/',
      redirectLink: this.sanitizer.bypassSecurityTrustUrl(buildLink(info))
    };

  }
}
