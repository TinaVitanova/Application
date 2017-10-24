import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validator } from '../../validators/FormValidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  ForgotPasswordForm: FormGroup;
  newemail: string;
  public SubmitAttempt = false;
  flagIncorrectEmail:boolean = false;
  flagCorrectEmail:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider) {
    this.ForgotPasswordForm = formBuilder.group({
    newemail: ['',Validators.compose([Validators.pattern('[a-z0-9]+\@[a-z]+\.com'),Validators.required, new Validator(UserGlobal, EventData).isGlobalEmailValid])]
  });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onBlur(){
    if(!this.ForgotPasswordForm.valid){
      if(!this.ForgotPasswordForm.controls.newemail.valid){
        this.flagIncorrectEmail = true;
        this.flagCorrectEmail=false;
    
      }else{
        this.flagIncorrectEmail = false;
        this.flagCorrectEmail=true;
      }
    }
  }

  Reset(){
    if(this.ForgotPasswordForm.valid){
      this.flagIncorrectEmail = false;
      this.SubmitAttempt=true;
    }
  }

}
