import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validator } from '../../validators/FormValidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { ApiProvider } from '../../providers/api-provider/api-provider';

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

  constructor(private apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider) {
    this.ForgotPasswordForm = formBuilder.group({
      username: [''],
      email: ['']
  });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  Reset(){
    if(this.ForgotPasswordForm.valid){
      this.flagIncorrectEmail = false;
      this.flagIncorrectUsername = false;
      this.SubmitAttempt=true;

      this.apiProvider.forgotPassword(this.email, this.username);
      //prati na backend
    }
    if(this.SubmitAttempt=true){
      //ako uspealo so backend
      this.warning=true;
    }
  }

}
