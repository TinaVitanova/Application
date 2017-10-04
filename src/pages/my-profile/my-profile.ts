import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  flagChange=false;
  Username=this.UserGlobal.getMyGlobalVar();
  email=this.UserGlobal.getEmail();
  public todo = {
    newusername:"",
    oldpassword:"",
    newpassword:"",
    newemail:""
  };

  Change(){
    this.UserGlobal.ChangeUser(this.todo);
  }
  OpenChange(){
    this.flagChange=true;
  }
 
  logForm(){
    console.log(this.todo)      
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

}
