import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeRoomPage } from './make-room';

@NgModule({
  declarations: [
    MakeRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeRoomPage),
  ],
})
export class MakeRoomPageModule {}
