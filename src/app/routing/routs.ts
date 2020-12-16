import {Routes} from '@angular/router';
import {BenefitsComponent} from '../widgets/benefits/benefits.component';
import {MainPageComponent} from '../widgets/_main-page/main-page/main-page.component';

export const appRoutes: Routes = [
  {path: 'profile', component: BenefitsComponent},
  {path: '', component: MainPageComponent},
];
