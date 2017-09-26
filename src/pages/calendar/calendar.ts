import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
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
      let start = moment(event.startTime).format('HH : mm');
      let end = moment(event.endTime).format('HH : mm');
      let cDate = moment(event.chosenDate).format('MMM Do YYYY');
      let rooms = this.navParams.get('room');;

      let alert = this.alertCtrl.create({
         title: 'Event: ' + event.title,
         message: '<div>Date:'+cDate+'<br>From: '+start+'<br>To: '+end+'<br> Room:'+rooms+'</div>',
        buttons:['OK']
      });
      alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  addEvent(){
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();

    modal.onDidDismiss(data=>{
        let eventData = data;
        
        eventData.chosenDate = new Date(data.chosenDate);
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(()=>{
            this.eventSource = events;
        });
    })
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController) {

  }


}
