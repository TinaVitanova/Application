import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySchedulePage } from './my-schedule';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    MySchedulePage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(MySchedulePage),
  ],
})
export class MySchedulePageModule {}
