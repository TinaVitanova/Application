import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { CalendarPage } from '../calendar/calendar';
import { MakeRoomPage } from '../make-room/make-room';
import { CreateUserPage } from '../create-user/create-user';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  calendarpage=CalendarPage;
  username;
  adminBtn = false;
  showEvents = false;
  flagCalendar;
  MyEvents=this.EventData.getEvents();
  StartTime;
  EndTime;
  FlagNextDay=false;
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
  IsDate(events){
    this.showEvents = true;
    let dateStart = moment(events.startTime).format('DD MM YYYY');
    let dateEnd = moment(events.endTime).format('DD MM YYYY');
    let dateToday = moment().format('DD MM YYYY');
    this.StartTime = moment(events.startTime).format('DD MM YYYY HH:mm');
    this.EndTime = moment(events.endTime).format('DD MM YYYY HH:mm');
    if (dateStart <= dateToday && dateToday <= dateEnd)
      return true;
    else
      return false;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.username=this.UserGlobal.getMyGlobalVar();
  }
  
  ionViewDidEnter(){
    this.username=this.UserGlobal.getMyGlobalVar();
  }

  ionViewWillEnter(){
    if(this.username=="admin" || this.username=="superadmin"){
      this.adminBtn=true;
      this.menuCtrl.enable(true, "adminMenu");
    }
    else{
    this.menuCtrl.enable(true, "userMenu");
    }
  }
  
}
