import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { EventDataProvider } from '../../providers/event-data/event-data';

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
  showRoom = this.EventData.getShowRoom();
  
  calendar = {
      mode: 'month',
      currentDate: this.selectedDay
  }; 
  showRooms(){
    return this.showRoom;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public EventData: EventDataProvider, public menuCtrl: MenuController) {
    this.loadEvents();
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
    var allEvents = this.EventData.getEvents();
    var eventsRoom = [];
  for (var i=0; i<allEvents.length; i++){
    if(allEvents[i].room == r){
    eventsRoom.push({
          title: allEvents[i].title,
          startTime: allEvents[i].startTime,
          endTime: allEvents[i].endTime,
          allday: allEvents[i].allDay
      });
    }}
      return eventsRoom;
  }
  createEvent (){
      var allEvents = this.EventData.getEvents();
      var events = [];
    for (var i=0; i<allEvents.length; i++){
      events.push({
            title: allEvents[i].title + " Room: " + this.EventData.getRoomName(i),
            startTime: allEvents[i].startTime,
            endTime: allEvents[i].endTime,
            allDay: allEvents[i].allDay
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
    var allEvents = this.EventData.getEvents();
    for(var i=0; i<allEvents.length;i++){
      if (event.title==allEvents[i].title){
        this.roomName=this.EventData.getRoomName(i);
      }
    }
    let trueDay = '<div class="alert-message"><b>FROM:</b> '+datestart+'<br><b>UNTILL:</b> '+dateend+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName + '</div>'; 
    if(event.allDay){
      trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>ALL DAY</b><br/><b>ROOM:</b> '+ this.roomName + '</div>';
    }
    else if(datestart == dateend){
      trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName + '</div>';
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

  ionViewDidLoad(){    
    this.ListOfRooms = this.EventData.getRoomData();
    this.showRoom = this.EventData.getShowRoom();
  }

}
