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
  loadRoomEvents(r){
    setTimeout(()=>{
      this.eventSource = this.showRoomEvents(r);
        })
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
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
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
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
            title: allEvents[i].title,
            startTime: allEvents[i].startTime,
            endTime: allEvents[i].endTime,
            allday: allEvents[i].allDay
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
   let date = moment(event.startTime).format('Do MMMM YYYY');
   let start = moment(event.startTime).format('HH:mm');
    let end = moment(event.endTime).format('HH:mm');
 
    let alert = this.alertCtrl.create({
       title: 'Event: ' + event.title,
       message: 'On: '+date+'<br>From: '+start+'<br>To: '+ end +'<br> Room:</div>',
      buttons:['OK']
    });
    alert.present();
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
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
