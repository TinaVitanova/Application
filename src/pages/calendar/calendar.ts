import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  calendar = {
      mode: 'month',
      currentDate: this.selectedDay
  }; 
  
  onViewTitleChanged(title) {
      this.viewTitle = title;
  }

  onEventSelected(event) {
     let start = moment(event.startTime).format('LLLL');
      let end = moment(event.endTime).format('LLLL');

      let alert = this.alertCtrl.create({
         title: 'Event: ' + event.title,
         message: 'From: '+start+'<br>To: '+end+'<br> Room:'+'</div>',
        buttons:['OK']
      });
      alert.present();
    
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    this.EventData.setPreselectedDate(this.selectedDay);
  }
    addEvent(){
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public EventData: EventDataProvider) {

  }
  createEvent (){
      var startDate = new Date(this.EventData.getStartTime());
      var endDate = new Date(this.EventData.getEndTime());
      var events = [];
      var startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      var endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        events.push({
            title: this.EventData.getTitle(),
            startTime: startTime,
            endTime: endTime,
        });
        return events;
    }
    
  load(){
    this.eventSource = this.createEvent();
}

  ionViewDidLoad(){      
  }

}
