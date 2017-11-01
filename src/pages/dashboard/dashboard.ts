import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { CalendarPage } from '../calendar/calendar';
import { MakeRoomPage } from '../make-room/make-room';
import { CreateUserPage } from '../create-user/create-user';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { ApiProvider } from '../../providers/api-provider/api-provider';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  calendarpage=CalendarPage;
  username;
  role;
  adminBtn = false;
  showEvents = false;
  flagCalendar;
  allDayEvent = false;
  MyEvents=[];
  Eventdata : {title: string, startTime: number, endTime: number, allDay: boolean, room: Object};
  reservations;
  StartTime;
  EndTime;
  StartDate;
  EndDate;
  FlagNextDay=false;

  constructor(private apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.username=this.UserGlobal.getMyGlobalVar();
    this.role=this.UserGlobal.getMyGlobalRole();
  }

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

    this.StartTime = moment(events.startTime).format('HH:mm');
    this.EndTime = moment(events.endTime).format('HH:mm');
    this.StartDate = moment(events.startTime).format('DD.MM');
    this.EndDate = moment(events.endTime).format('-DD.MM');
    if(events.allDay){
      dateEnd=moment(events.endTime).add(-1,"days").format('DD MM YYYY');
    }

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.username=this.UserGlobal.getMyGlobalVar();
  }

  
  ionViewDidEnter(){
    this.username=this.UserGlobal.getMyGlobalVar();
    // this.EventData.setIsChangeEvent(false);
    this.MyEvents=[];
    this.apiProvider.getReservations()
    .then(data => {
      this.reservations = data;
      for(var i=0;i<this.reservations.length;i++){
        this.Eventdata = {title: this.reservations[i].reservationTitle, startTime: this.reservations[i].meetStarts, endTime: this.reservations[i].meetEnds, allDay: this.reservations[i].allDay, room: this.reservations[i].room};
        this.MyEvents.push(this.Eventdata);
      }
    });
  }

  ionViewWillEnter(){

    if(this.role.category==0 || this.role.category==1){

      this.adminBtn=true;
      this.menuCtrl.enable(true, "adminMenu");
    }
    else if(this.role.category==2){
    this.menuCtrl.enable(true, "userMenu");
    }

  }
  
}
