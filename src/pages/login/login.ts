import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { CalendarPage } from '../calendar/calendar';
import { MakeRoomPage } from '../make-room/make-room';
import { SignupPage } from '../signup/signup';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  calendarpage=CalendarPage;
  username=this.UserGlobal.getMyGlobalVar();
  adminBtn = false;
  flagCalendar;

  MakeRoomNav(){
    this.navCtrl.push(MakeRoomPage)
  }

  ReserveNav(){
   this.EventData.setFlag(this.flagCalendar);
    this.navCtrl.push(ReserveEventPage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  CreateAccNav(){
    this.navCtrl.push(SignupPage, {param2: this.username})
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
 
    if(this.username=="admin" || this.username=="superadmin"){
      this.adminBtn=true;
      this.menuCtrl.enable(true, "adminMenu");
    }
    else{
    this.menuCtrl.enable(true, "userMenu");
    } 
  }

  ionViewDidLoad() {
    this.flagCalendar = false;
    console.log('ionViewDidLoad LoginPage');
  }
}
