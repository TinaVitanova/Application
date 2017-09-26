import { AlertController } from 'ionic-angular/umd';
import { Component } from '@angular/core';
<<<<<<< HEAD
import { ModalController, NavController } from 'ionic-angular';
import moment from 'moment';
=======
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
>>>>>>> 3142a121718149b392d73e659abb3db1d75bb0c1

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
<<<<<<< HEAD

  calendar = {
      mode: 'month',
      currendDate: this.selectedDay
  }
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {

  }

  addEvent(){
    let modal = this.modalCtrl.create('ReservePage', {selectedDay: this.selectedDay});
    modal.present();

    modal.onDidDismiss(data =>{
        if(data){
            let eventData = data;

            eventData.startTime = new Date(data.startTime);
            eventData.endTime = new Date(data.endTime);

            let events = this.eventSource;
            events.push(eventData);
            this.eventSource = [];
            setTimeout(() =>{
                this.eventSource = events;
            });
        }
    })
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime;
=======
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

>>>>>>> 3142a121718149b392d73e659abb3db1d75bb0c1
  }

  onEventSelected(event){
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
       title: '' + event.title,
       subTitle: 'From: ' + start + '<br>To: ' + end,
       buttons: ['OK']
    });
    alert.present();
  }

}
