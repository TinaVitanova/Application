import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  checked;
  username: string;
  new = {
    password:"",
    mail:"",
    name:"",
  };
  logFormSignUp(){
    console.log(this.new)
  }

  shouldHide(){
    if(this.username=="superadmin")
    return false;
    else
    return true;
  }

  CreateNewUser(){
    this.UserGlobal.addNewUser(this.new.name);
    this.UserGlobal.setEmail(this.new.mail);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserGlobal: UsernameGlobalProvider) {
    this.username = navParams.get('param2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
