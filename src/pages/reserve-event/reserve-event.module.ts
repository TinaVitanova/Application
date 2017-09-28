import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReserveEventPage } from './reserve-event';

@NgModule({
  declarations: [
    ReserveEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ReserveEventPage),
  ],
})
export class ReserveEventPageModule {}
