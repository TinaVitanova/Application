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
  flagCalendar;
  allDayEvent = false;
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
    let dateStart = moment(events.startTime).format('DD MM YYYY');
    let dateEnd = moment(events.endTime).format('DD MM YYYY');
    let dateToday = moment().format('DD MM YYYY');
    this.StartTime = moment(events.startTime).format('DD MM YYYY HH:mm');
    this.EndTime = moment(events.endTime).format('DD MM YYYY HH:mm');

    //Podeleni start i end time vo saati minuti i datum

    let startTimeEventDate=moment(this.StartTime).format('DD MM YYYY');
    let startTimeEventHoursMinutes=moment(this.StartTime).format('HH:mm');
    let endTimeEventDate=moment(this.EndTime).format('DD MM YYYY');
    let endTimeEventHoursMinutes=moment(this.EndTime).format('HH:mm');

    //Sobata ime i event title

    let eventTitle = events.title;
    // let eventRoomName = events.room.name;

    if (dateStart <= dateToday && dateToday <= dateEnd){
    if(events.allDay==true){
      if(dateEnd!=dateToday){
        this.allDayEvent=true;
        return true;
      }
      else{
        return false;
      }
    }else {
      this.allDayEvent=false;
      return true;
  }}
    else
      return false;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.username=this.UserGlobal.getMyGlobalVar();
  }
  
  ionViewDidEnter(){
    this.username=this.UserGlobal.getMyGlobalVar();
    // this.EventData.setIsChangeEvent(false);
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
