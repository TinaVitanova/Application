import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { ApiProvider } from '../../providers/api-provider/api-provider';

import * as moment from 'moment';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  flagCalendar;
  ListOfRooms;
  roomName;
  reservations;
  showRoom = true;
  
  calendar = {
      mode: 'month',
      currentDate: this.selectedDay
  }; 
  showRooms(){
    return this.showRoom;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider:ApiProvider, private alertCtrl: AlertController, public EventData: EventDataProvider, public menuCtrl: MenuController) {
    this.loadEvents();
    this.apiProvider.getReservations()
    .then(data => {
      this.reservations = data;
      console.log(this.reservations)
    });
    }
  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  previousMonth(){
    this.calendar.currentDate=moment(this.calendar.currentDate).add(-1,'months').toDate();
  }
  nextMonth(){
    this.calendar.currentDate=moment(this.calendar.currentDate).add(1,'months').toDate();
  }
  loadRoomEvents(r){
    setTimeout(()=>{
      this.eventSource = this.showRoomEvents(r);
        })
  }

  onTimeSelected(ev) {
  }
    addEvent(){
      this.flagCalendar = true;  
      this.EventData.setFlagIsCalendarPage(this.flagCalendar);
    this.navCtrl.push(ReserveEventPage);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };
  onRangeChanged(ev) {
  }
  showRoomEvents(r){
    var eventsRoom = [];
  for (var i=0; i<this.reservations.length; i++){
    let start = new Date(this.reservations[i].meetStarts)
    let end = new Date(this.reservations[i].meetEnds)
    if(this.reservations[i].room.roomId == r.roomId){
    eventsRoom.push({
          title: this.reservations[i].reservationTitle,
          startTime: start,
          endTime: end,
          allday: false
      });
    }}
      return eventsRoom;
  }
  createEvent (){
      var events = [];
    for (var i=0; i<this.reservations.length; i++){
      let start = new Date(this.reservations[i].meetStarts)
      let end = new Date(this.reservations[i].meetEnds)
      events.push({
            title: this.reservations[i].reservationTitle,
            startTime: start,
            endTime: end,
            allDay: false
        });
      }
        return events;

    }
    
  loadEvents(){
      setTimeout(()=>{
    this.eventSource = this.createEvent();
      })
  }
  onEventSelected(event) {
   let datestart = moment(event.startTime).format('Do MMMM YYYY');
   let dateend = moment(event.endTime).format('Do MMMM YYYY');
   let start = moment(event.startTime).format('HH:mm');
    let end = moment(event.endTime).format('HH:mm');
    for(var i=0; i<this.reservations.length;i++){
      if (event.title==this.reservations[i].reservationTitle){
        this.roomName=this.reservations[i].room;
      }
    }
    let trueDay = '<div class="alert-message"><b>FROM:</b> '+datestart+'<br><b>UNTILL:</b> '+dateend+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName.roomName + '</div>'; 
    if(event.allDay){
      trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>ALL DAY</b><br/><b>ROOM:</b> '+ this.roomName.roomName + '</div>';
    }
    else if(datestart == dateend){
      trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName.roomName + '</div>';
    }
    let alert = this.alertCtrl.create({
      cssClass: 'alert-style',
       title: '<p class="alert-title"><b>Event:</b><br />' + '<span>' + event.title + '</span></p><hr />',
       message: trueDay,

       buttons:[
       {
         cssClass: 'alert-btn',
         text: 'OK'
       }]
    });
    alert.present();
  }

  ionViewDidEnter(){
    this.loadEvents();

    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }

  ionViewWillEnter(){    
    this.ListOfRooms = this.EventData.getRooms();
    this.showRoom = true;
  }

}
