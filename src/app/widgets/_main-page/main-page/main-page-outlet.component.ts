import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page-outlet',
  template: `
    <router-outlet name="main-page"></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageOutletComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
