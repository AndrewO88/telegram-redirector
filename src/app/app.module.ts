import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BenefitsComponent } from './widgets/benefits/benefits.component';
import {MatIconModule} from '@angular/material/icon';
import { ServiceComponent } from './widgets/service/service.component';
import { ShortComponent } from './widgets/short/short.component';
import { ExamplesComponent } from './widgets/examples/examples.component';

@NgModule({
  declarations: [
    AppComponent,
    BenefitsComponent,
    ServiceComponent,
    ShortComponent,
    ExamplesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
