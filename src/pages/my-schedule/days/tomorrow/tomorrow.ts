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
  StartTime;
  EndTime;
  FlagEventYesterday=true;
  FlagNextDay;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
  }
  IsDateTomorrow(events){
    let nextDay =  moment().add(1,'days').format('DD MM YYYY');
    let dateStart = moment(events.startTime).format('DD MM YYYY');
    let dateEnd = moment(events.endTime).format('DD MM YYYY');
    this.StartTime = moment(events.startTime).format('HH:mm');
    this.EndTime = moment(events.endTime).format('HH:mm');
    if (dateStart == nextDay){
      if (dateEnd!=dateStart){
        this.FlagNextDay=true;
      }
      else{
        this.FlagNextDay=false;
    }
    this.FlagEventYesterday=true;
    return true;
  }
  else if(dateEnd==nextDay){
    this.FlagEventYesterday=false;
    return true;
  }
  else return false;

  
    
  }
  AlertForEvent(events){
    let date = moment(events.startTime).format('Do MMMM YYYY');
    let start = moment(events.startTime).format('HH:mm');
     let end = moment(events.endTime).format('HH:mm');
  
     let alert = this.alertCtrl.create({
        title: 'Event: ' + events.title,
        message: 'On: '+date+'<br>From: '+start+'<br>To: '+end+'<br> Room:</div>',
       buttons:['OK']
     });
     alert.present();
  }

}
