import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventDataProvider } from '../../../../providers/event-data/event-data';
import * as moment from 'moment';
/**
 * Generated class for the TodayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {
  MyEvents=this.EventData.getEvents();
  today= new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayPage');
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
