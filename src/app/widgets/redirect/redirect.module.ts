import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedirectComponent} from './redirect.component';
import {ReceiverComponent} from './widget/receiver/receiver.component';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatButtonModule} from '@angular/material/button';
import {RedirectorComponent} from './widget/redirector/redirector.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [RedirectComponent, ReceiverComponent, RedirectorComponent],
  exports: [RedirectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class RedirectModule {
}
