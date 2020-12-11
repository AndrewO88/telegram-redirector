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
    <div class="container">
      <div *ngIf="viewModel as view" class="container">

        <ng-container *ngIf="view.isReceive; else forward">
          <app-receiver></app-receiver>
        </ng-container>

        <ng-template #forward>
          <app-redirector [redirectLink]="view.redirectLink"></app-redirector>
        </ng-template>

      </div>
    </div>
  `,
  styles: [],
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
      isReceive: !info.filter(part => !!part).length,
      currentPathname: location.pathname,
      rootPathname: '/',
      redirectLink: this.sanitizer.bypassSecurityTrustUrl(buildLink(info))
    };

  }
}
