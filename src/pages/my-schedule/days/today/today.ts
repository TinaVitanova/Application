import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventDataProvider } from '../../../../providers/event-data/event-data';
import { ReserveEventPage } from '../../../reserve-event/reserve-event';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {
  MyEvents=this.EventData.getEvents();
  StartTime;
  EndTime;
  StartDate;
  EndDate;
  allDayEvent=false;
  FlagNextDay;
  FlagEventYesterday=true;
  roomName;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
  }
  IsDateToday(events){
    let dateStart = moment(events.startTime).format('DD MM YYYY');
    let dateToday = moment().format('DD MM YYYY');
    let dateEnd = moment(events.endTime).format('DD MM YYYY');
    this.StartTime = moment(events.startTime).format('HH:mm');
    this.EndTime = moment(events.endTime).format('HH:mm');


    this.StartDate = moment(events.startTime).format('DD.MM');
    this.EndDate = moment(events.endTime).format('-DD.MM');
    
    if(events.allDay){
      dateEnd=moment(events.endTime).add(-1,"days").format('DD MM YYYY');
    }
    let eventTitle = events.title;

    
    if (dateStart <= dateToday && dateToday <= dateEnd){
      if(events.allDay==true){
        if(dateEnd!=dateToday){
          this.allDayEvent=true;
          return true;
        }
        else{
          return false;
        }
      }else {
        this.allDayEvent=false;
        return true;
    }}
      else
        return false;
  }


  AlertForEvent(events){
    let datestart = moment(events.startTime).format('Do MMMM YYYY');
    let dateend = moment(events.endTime).format('Do MMMM YYYY');
    let start = moment(events.startTime).format('HH:mm');
     let end = moment(events.endTime).format('HH:mm');
     var allEvents = this.EventData.getEvents();
     for(var i=0; i<allEvents.length;i++){
       if (events.title==allEvents[i].title){
         this.roomName="aaa"//this.EventData.getRoomName(i);
       }
     }
     var trueDay = '<div class="alert-message"><b>FROM:</b> '+datestart+'<br><b>UNTILL:</b> '+dateend+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName + '</div>'; 
     if(events.allDay){
      trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>ALL DAY</b><br/><b>ROOM:</b> '+ this.roomName + '</div>';
    }
    else if(datestart == dateend){
      trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName + '</div>';
    }
     let alert = this.alertCtrl.create({
       cssClass: 'alert-style',
        title: '<p class="alert-title"><b>Event:</b><br />' + '<span>' + events.title + '</span></p><hr />',
        message: trueDay,
        buttons:[
          {
            cssClass:'alert-btn',
            text: 'Delete',
            handler: data => {
              this.EventData.deleteEvent(events);
            }
          },
          {
            cssClass:'alert-btn',
            text:'Change',
            handler: data =>{
              this.EventData.setChangeEvent(events);
              this.EventData.setIndexOfChangeEvent(this.MyEvents.indexOf(events));
              this.EventData.setIsChangeEvent(true);
              this.navCtrl.push(ReserveEventPage);
            }
          },
        {
          cssClass: 'alert-btn',
          text: 'OK'
        }]
     });
     alert.present();
  }
}
