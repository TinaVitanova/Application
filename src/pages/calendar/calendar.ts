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
  ListOfRooms = [];

  calendar = {
      mode: 'month',
      currentDate: this.selectedDay
  }; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public EventData: EventDataProvider, public menuCtrl: MenuController) {
    this.loadEvents();
    
    }
  onViewTitleChanged(title) {
      this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
    addEvent(){
      this.flagCalendar = true;  
      this.EventData.setFlag(this.flagCalendar);
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
  
  createEvent (){
     var startDate = new Date(this.EventData.getStartTime());
      var endDate = new Date(this.EventData.getEndTime());
      var events = [];
      var startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
      var endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes());
console.log(startTime + '   ova e moj start time   '+ endTime + '  ova e moj end time  ')
      
      events.push({
            title: this.EventData.getTitle(),
            startTime: startTime,
            endTime: endTime,
            allday: false
        });
        this.EventData.setEvents(events);
        return events;
    }
    
  loadEvents(){
      setTimeout(()=>{
    this.eventSource = this.createEvent();
    console.log('load event ' + this.eventSource);
      })
}

onEventSelected(event) {
   let date = moment(event.startTime).format('Do MMMM YYYY');
   let start = moment(event.startTime).format('HH:MM');
    let end = moment(event.endTime).format('HH:MM');
 
    let alert = this.alertCtrl.create({
       title: 'Event: ' + event.title,
       message: 'On: '+date+'<br>From: '+start+'<br>To: '+end+'<br> Room:'+this.EventData.getRoom() + '</div>',
      buttons:['OK']
    });
    alert.present();
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
}


  ionViewDidLoad(){    
    this.ListOfRooms.push(this.EventData.getRoomData());
  }

}
