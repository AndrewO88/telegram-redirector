import {Routes} from '@angular/router';
import {MainPageComponent} from '../widgets/_main-page/main-page/main-page.component';
import {ProfilesComponent} from '../widgets/profiles/profiles.component';

export const appRoutes: Routes = [
  {path: 'profile', component: ProfilesComponent},
  {path: '', component: MainPageComponent},
];
