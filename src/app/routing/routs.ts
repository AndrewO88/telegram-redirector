import {Routes} from '@angular/router';
import {MainPageComponent} from '../widgets/_main-page/main-page/main-page.component';
import {ProfComponent} from '../widgets/prof/prof.component';
import {RegistrationComponent} from '../widgets/registration/registration.component';
import {RedirectComponent} from '../widgets/redirect/redirect.component';
import {PersonResolverService} from './resolvers/person-resolver.service';

export const appRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfComponent, resolve: {person: PersonResolverService}},
  {path: '', component: MainPageComponent},
  {path: '**', component: RedirectComponent},
];
