import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';
import { CalendarPage } from '../calendar/calendar';
import { MakeRoomPage } from '../make-room/make-room';
import { SignupPage } from '../signup/signup';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  reservepage=ReservePage;
  calendarpage=CalendarPage;
  username=this.UserGlobal.getMyGlobalVar();
  adminBtn = false;

  MakeRoomNav(){
    this.navCtrl.push(MakeRoomPage)
  }

  ReserveNav(){
    this.navCtrl.push(ReservePage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  CreateAccNav(){
    this.navCtrl.push(SignupPage, {param2: this.username})
  }

  /*isAdmin(){
    if(this.username=="admin" || this.username=="superadmin"){
      this.adminBtn=true;
    }
  }*/
  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.menuCtrl.enable(true, "myMenu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if(this.username=="admin" || this.username=="superadmin"){
      this.adminBtn=true;
    }

  }

}
