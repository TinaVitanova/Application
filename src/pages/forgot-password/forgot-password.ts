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
  email: string;
  username:string;
  public SubmitAttempt = false;
  flagIncorrectEmail:boolean = false;
  flagIncorrectUsername:boolean = false;
  warning=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider) {
    this.ForgotPasswordForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/[a-zA-Z0-9]*/),Validators.required, new Validator(UserGlobal, EventData).isGlobalUsernameValid])],
      email: ['',Validators.compose([Validators.pattern(/[a-z0-9]+\@[a-z]+\.[a-z]{2,3}/),Validators.required, new Validator(UserGlobal, EventData).isGlobalEmailValid])]
  });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onBlurEmail(){
    if(!this.email){
      this.flagIncorrectEmail = false;
    }
    else{
    if(!this.ForgotPasswordForm.valid){
      if(!this.ForgotPasswordForm.controls.email.valid){
        this.flagIncorrectEmail = true;
      }else{
        this.flagIncorrectEmail = false;
      }
    }
    }
  }

  onBlurUsername(){
    if(!this.username){
      this.flagIncorrectUsername = false;
    }
    else{
    if(!this.ForgotPasswordForm.valid){
      if(!this.ForgotPasswordForm.controls.email.valid){
        this.flagIncorrectUsername = true;
      }else{
        this.flagIncorrectUsername = false;
      }
    }
    }
  }
  

  Reset(){
    if(this.ForgotPasswordForm.valid){
      this.flagIncorrectEmail = false;
      this.flagIncorrectUsername = false;
      this.SubmitAttempt=true;
      //prati na backend
    }
    if(this.SubmitAttempt=true){
      //ako uspealo so backend
      this.warning=true;
    }
  }

}
