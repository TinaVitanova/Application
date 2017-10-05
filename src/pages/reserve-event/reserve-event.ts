import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { EventDataProvider } from '../../providers/event-data/event-data';


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
  flag;
  event = { day: new Date(), startTime: new Date(), endTime: new Date(), allDay: false, title:""};
  minDate = new Date().toISOString();
  rooms:"";
  ListOfRooms = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
    
    this.flag = this.EventData.getFlag();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserveEventPage');
    
    this.ListOfRooms.push(this.EventData.getRoomData());
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
    this.flag = this.EventData.getFlag();

      let date = moment(this.event.day).format('Do MMMM YYYY');
      let start = this.event.startTime;
      let end = this.event.endTime;
      console.log(new Date() + '    rthsrh   ')
      if (start==end || start == new Date()){
        let alert = this.alertCtrl.create({
          title: 'Error!',
          message: 'You have not added a start and end time for your event',
          buttons:["OK"]
       });
       alert.present();
      }
      else{
      let alert = this.alertCtrl.create({
        title: 'You have created an event: ' + this.event.title,
        message: 'On: '+date+'<br>From: '+start+'<br>To: '+end+'<br> Room:'+ this.rooms + '</div>',
        buttons:[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Reserve',
            role: 'confirm',
            handler: data => {
              this.EventData.setStartTime(this.event.startTime);
              this.EventData.setEndTime(this.event.endTime);
              this.EventData.setTitle(this.event.title);
              this.EventData.setRoom(this.rooms);
              this.EventData.setDay(this.event.day);
              console.log('Created new event');
              if (this.flag == true)
                this.navCtrl.pop();
                else
                this.ionViewWillEnter();
            }
          }
         ]
     });
     alert.present();
    }
  }
  ionViewWillEnter(){

  }

}
