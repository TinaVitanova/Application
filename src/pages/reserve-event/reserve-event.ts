import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { CalendarPage } from '../calendar/calendar';

/**
 * Generated class for the ReserveEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserve-event',
  templateUrl: 'reserve-event.html',
})
export class ReserveEventPage {
  isReserved: boolean;
  event = { day: new Date(), startTime: new Date(), endTime: new Date(), allDay: false, title:""};
  minDate = new Date().toISOString();
  preselectedDate = new Date();
  rooms:"";
  constructor(public navCtrl: NavController, public navParams: NavParams, public EventData: EventDataProvider) {
  }
  shouldHide(){
    if(this.isReserved==true)
    return false;
    else
    return true;
  }
  findRoom(){
    this.isReserved=true;
  }
  save(){
    this.EventData.setStartTime(this.event.startTime);
    this.EventData.setEndTime(this.event.endTime);
    this.EventData.setTitle(this.event.title);
    this.EventData.setRoom(this.rooms);
    // this.EventData.setDay(this.event.day);
    this.navCtrl.push(CalendarPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserveEventPage');
  }

}
