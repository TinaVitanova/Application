import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDataProvider } from '../../providers/event-data/event-data';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public EventData: EventDataProvider) {
  }
  

  ionViewDidLoad() {
    
    console.log('Mine Eventsss '+ this.MyEvents[0].title + 'vreme: '+ this.MyEvents[0].startTime + ' vreme dooo: '+ this.MyEvents[0].endTime);
    console.log('ionViewDidLoad MySchedulePage');
  }
  AlertForEvent(){

  }

}
