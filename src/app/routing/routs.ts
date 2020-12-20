import {Routes} from '@angular/router';
import {MainPageComponent} from '../widgets/_main-page/main-page/main-page.component';
import {ProfComponent} from '../widgets/prof/prof.component';
import {RegistrationComponent} from '../widgets/registration/registration.component';
import {RedirectComponent} from '../widgets/redirect/redirect.component';
import {LinkResolver} from '../srv/link-resolver.service';

export const appRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfComponent},
  {path: '', component: MainPageComponent},
  {path: '**', component: RedirectComponent, resolve: {links: LinkResolver}},
];
