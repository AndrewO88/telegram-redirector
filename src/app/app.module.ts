import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BenefitsComponent} from './widgets/benefits/benefits.component';
import {MatIconModule} from '@angular/material/icon';
import {ServiceComponent} from './widgets/service/service.component';
import {ShortComponent} from './widgets/short/short.component';
import {ExamplesComponent} from './widgets/examples/examples.component';
import {FooterComponent} from './widgets/footer/footer.component';
import {MenuComponent} from './widgets/menu/menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RedirectModule} from './widgets/redirect/redirect.module';
import {RoutingModule} from './routing/routing.module';
import {TrustComponent} from './widgets/trust/trust.component';


@NgModule({
  declarations: [
    AppComponent,
    BenefitsComponent,
    ServiceComponent,
    ShortComponent,
    ExamplesComponent,
    FooterComponent,
    MenuComponent,
    TrustComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatToolbarModule,
    RedirectModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
