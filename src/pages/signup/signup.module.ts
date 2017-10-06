import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { FileUploaderModule } from "file-uploader-component/angular";



@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    FileUploaderModule,
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
