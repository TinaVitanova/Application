import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { EventDataProvider } from '../../providers/event-data/event-data';

import * as moment from 'moment';
/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  rooms:"";
  isReserved: boolean;

  event = { title:"", startTime: new Date().toISOString(), endTime: new Date().toISOString()}
  minDate = new Date().toISOString();
  
  shouldHide(){
    if(this.isReserved==true)
    return false;
    else
    return true;
  }

  findRoom(){
    this.isReserved=true;
    this.EventData.setTitle(this.event.title)
    this.EventData.setStartTime(this.event.startTime);
    this.EventData.setEndTime(this.event.endTime);
    this.EventData.setRoom(this.rooms);
  }

  /*reserve() {
    let confirm = this.alertCtrl.create({
      title: 'You have chosen: ',
      message: '<div>Date:'+this.myDate+'<br> Time:'+this.myTime+'<br> Capacity:'+this.capacity+'<br> Room:'+this.rooms+'</div>',
      
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]  
    });
    confirm.present();
    
      this.navCtrl.push(EventModalPage, {date: this.myDate, time: this.myTime, capacity: this.capacity, room: this.rooms});
  }
  */
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private viewCtrl: ViewController, public EventData: EventDataProvider) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

  save(){
    this.navCtrl.push(CalendarPage)
  }

}
