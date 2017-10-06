import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventDataProvider } from '../../../../providers/event-data/event-data';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-tomorrow',
  templateUrl: 'tomorrow.html',
})
export class TomorrowPage {
  MyEvents=this.EventData.getEvents();
  today= new Date();
  StartTime;
  EndTime;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TomorrowPage');
  }
  IsDateTomorrow(events){
    let date = moment(events.startTime).format('DD MM YYYY');
    let nextDay =  moment().add(1,'days').format('DD MM YYYY');

    this.StartTime = moment(events.startTime).format('HH:mm');
    this.EndTime = moment(events.endTime).format('HH:mm');
    if (date == nextDay){
     console.log('isti se');
      return true;
    }
    else{
      console.log('ne se');
       return false;
     }
    
  }
  AlertForEvent(events){
    let date = moment(events.startTime).format('Do MMMM YYYY');
    let start = moment(events.startTime).format('HH:mm');
     let end = moment(events.endTime).format('HH:mm');
  
     let alert = this.alertCtrl.create({
        title: 'Event: ' + events.title,
        message: 'On: '+date+'<br>From: '+start+'<br>To: '+end+'<br> Room:'+this.EventData.getRoom() + '</div>',
       buttons:['OK']
     });
     alert.present();
  }

}