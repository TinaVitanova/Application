import { EventDataProvider } from './../../providers/event-data/event-data';
import { ReserveEventPage } from './../reserve-event/reserve-event';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the MySchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-my-schedule',
  templateUrl: 'my-schedule.html',
})
export class MySchedulePage {

  MyEvents=this.EventData.getEvents();
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }
  


  ionViewDidLoad() {
    
    console.log('Mine Eventsss '+ this.MyEvents[0].title + 'vreme: '+ this.MyEvents[0].startTime + ' vreme dooo: '+ this.MyEvents[0].endTime);
    console.log('ionViewDidLoad MySchedulePage');
  }
  AlertForEvent(events){
    console.log('ova e ona events: '+ events);
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
