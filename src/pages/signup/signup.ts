import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
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
  NewAccount(){

  }
  createdAccNav(){
    /*
    this.NewAccount() {
      let confirm = this.alertCtrl.create({
        title: 'Create Accout',
        message: 'This will find available rooms',
        
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
              this.isReserved=false;
            }
          },
          {
            text: 'Agree',
            handler: () => {
              console.log('Agree clicked');
              this.isReserved=true;
            }
          }
        ]
      });
      confirm.present();
    }
    */
    this.navCtrl.push(HomePage)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
