import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
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
  adminpassword:"";
  homepage=HomePage;
  new = {
    username:"",
    password:"",
    passwordre:"",
    mail:"",
    name:"",
  };
  logFormSignUp(){
    console.log(this.new)
  }
  ShowCodeField(){
    return true;
  }
  shouldHide(){
    if(this.checked==true)
    return false;
    else
    return true;
  }
  createdAccNav(){
    this.navCtrl.push(HomePage)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
