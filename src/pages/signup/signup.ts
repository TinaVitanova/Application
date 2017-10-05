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
  username: string;
  isAdmin: boolean;
  new = {
    fullname:"",
    password:"",
    email:"",
    username:""
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
    this.UserGlobal.SendUserData(this.new.fullname, this.new.username, this.new.email, this.new.password, this.isAdmin);
    let alert = this.alertCtrl.create({
      title: 'You have created the user: ',
      subTitle: 'Fullname: ' + this.new.fullname + 
                '<br>Username: ' + this.new.username + 
                '<br>Email: ' + this.new.email + 
                '<br>Password: ' + this.new.password + 
                '<br>Is admin? '  + this.isAdmin,       
     buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: data => {
          this.UserGlobal.addNewUser(this.new.username);
          this.UserGlobal.setEmail(this.new.email);
          console.log('Created new user');
        }
      }
     ]
   });
   alert.present();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserGlobal: UsernameGlobalProvider) {
    this.username = navParams.get('param2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
