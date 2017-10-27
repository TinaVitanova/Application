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
  warning=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider) {
    this.ForgotPasswordForm = formBuilder.group({
    newemail: ['',Validators.compose([Validators.pattern(/[a-z0-9]+\@[a-z]+\.[a-z]{2,3}/),Validators.required, new Validator(UserGlobal, EventData).isGlobalEmailValid])]
  });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onBlur(){
    if(!this.newemail){
      this.flagIncorrectEmail = false;
    }
    else{
    if(!this.ForgotPasswordForm.valid){
      if(!this.ForgotPasswordForm.controls.newemail.valid){
        this.flagIncorrectEmail = true;
      }else{
        this.flagIncorrectEmail = false;
      }
    }
    }
  }

  Reset(){
    if(this.ForgotPasswordForm.valid){
      this.flagIncorrectEmail = false;
      this.SubmitAttempt=true;
      //prati na backend
    }
    if(this.SubmitAttempt=true){
      //ako uspealo so backend
      this.warning=true;
    }
  }

}
