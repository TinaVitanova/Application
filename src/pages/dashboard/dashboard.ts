import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { CalendarPage } from '../calendar/calendar';
import { MakeRoomPage } from '../make-room/make-room';
import { CreateUserPage } from '../create-user/create-user';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  calendarpage=CalendarPage;
  username;
  adminBtn = false;
  flagCalendar;

  MakeRoomNav(){
    this.navCtrl.push(MakeRoomPage)
  }

  ReserveNav(){
    
    this.flagCalendar = false;
    this.EventData.setFlagIsCalendarPage(this.flagCalendar);
    this.navCtrl.push(ReserveEventPage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  CreateAccNav(){
    this.navCtrl.push(CreateUserPage, {param2: this.username})
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
 
    this.username=this.UserGlobal.getMyGlobalVar();
    if(this.username=="admin" || this.username=="superadmin"){
      this.adminBtn=true;
      this.menuCtrl.enable(true, "adminMenu");
    }
    else{
    this.menuCtrl.enable(true, "userMenu");
    } 
  }
  ionViewDidEnter(){
    this.username=this.UserGlobal.getMyGlobalVar();
    console.log(this.username)
  }
  ionViewDidLoad() {
  }
}
