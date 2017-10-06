import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateUserPage } from './create-user';
import { FileUploaderModule } from "file-uploader-component/angular";

@NgModule({
  declarations: [
    CreateUserPage,
  ],
  imports: [
    FileUploaderModule,
    IonicPageModule.forChild(CreateUserPage),
  ],
})
export class CreateUserPageModule {}
