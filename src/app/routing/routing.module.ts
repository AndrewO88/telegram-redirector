import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routs';


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
