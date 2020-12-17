import {Routes} from '@angular/router';
import {MainPageComponent} from '../widgets/_main-page/main-page/main-page.component';
import {ProfComponent} from '../widgets/prof/prof.component';
import {RegistrationComponent} from '../widgets/registration/registration.component';
import {AppComponent} from '../app.component';

export const appRoutes: Routes = [
  {path: 'profile', component: ProfComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: MainPageComponent},
  // {path: '**', component: AppComponent},
];
