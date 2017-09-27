import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
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
      this.loadEvents()
      let start = moment(event.startTime).format('LLLL');
      let end = moment(event.endTime).format('LLLL');
      let rooms = event.room;

      let alert = this.alertCtrl.create({
         title: 'Event: ' + event.title,
         message: 'From: '+start+'<br>To: '+end+'<br> Room:'+rooms+'</div>',
        buttons:['OK']
      });
      alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  loadEvents(){
    var dateStart = this.EventData.getStartTime();
    var dateEnd = this.EventData.getEndTime();
    var events = [];
    var startTime = new  Date(dateStart.getFullYear(), dateStart.getMonth(),dateStart.getDate(),dateStart.getHours(),dateStart.getMinutes());
    var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(),dateEnd.getDate(),dateEnd.getHours(),dateEnd.getMinutes());
    events.push({
        title:this.EventData.getTitle(),
        startTime: startTime,
        endTime: endTime,
    });
    return events;
    /*var events = [{
        title:this.eventData.title,
        start:this.eventData.startTime,
        end:this.eventData.endTime
    }]
    this.eventSource = [];
    setTimeout(()=>{
        this.eventSource = events;
        
})
*/
  }

  addEvent(){
    this.navCtrl.push('EventModalPage', {selectedDay: this.selectedDay});
        
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController, public EventData: EventDataProvider) {

  }


}
