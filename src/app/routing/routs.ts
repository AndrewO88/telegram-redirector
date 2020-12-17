import {Routes} from '@angular/router';
import {MainPageComponent} from '../widgets/_main-page/main-page/main-page.component';
import {ProfilesComponent} from '../widgets/profiles/profiles.component';
import {ProfComponent} from '../widgets/prof/prof.component';

export const appRoutes: Routes = [
  {path: 'profile', component: ProfComponent},
  {path: '', component: MainPageComponent},
];
