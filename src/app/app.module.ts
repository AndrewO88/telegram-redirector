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
import {HttpClientModule} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {MainPageComponent} from './widgets/_main-page/main-page/main-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ProfComponent} from './widgets/prof/prof.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {NewLinkComponent} from './widgets/prof/new-link/new-link.component';
import {RegistrationComponent} from './widgets/registration/registration.component';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  declarations: [
    AppComponent,
    BenefitsComponent,
    ServiceComponent,
    ShortComponent,
    ExamplesComponent,
    FooterComponent,
    MenuComponent,
    TrustComponent,
    MainPageComponent,
    ProfComponent,
    NewLinkComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatToolbarModule,
    RedirectModule,
    RoutingModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    CustomFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
