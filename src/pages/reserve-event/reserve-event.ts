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
  public title;
  public endTime;
  public startTime;
  public day;
  public minDate = moment().utc().format('YYYY-MM-DD').toString();
  public maxDate = moment().utc().add(30,'y').format('YYYY').toString();

  rooms:"";
  ListOfRooms = [];
   
  showRoom = this.EventData.getShowRoom();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
    console.log ('initial event start time: ' + this.startTime + ' initial end time: ' + this.endTime + ' initial date: ' + this.day)
    this.flag = this.EventData.getFlag();
  
  }

  loadEvents(){  
  this.EventData.getLoadEvents();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserveEventPage');
    this.showRoom = this.EventData.getShowRoom();

    this.day = moment().toISOString();

    this.ListOfRooms.push(this.EventData.getRoomData());
  }

  showRooms(){
    return this.showRoom;
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

      let date = moment(this.day).format('Do MMMM YYYY');
      let start = this.startTime;
      let end = this.endTime;
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
        title: 'You have created an event: ' + this.title,
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
              this.EventData.setStartTime(this.startTime);
              this.EventData.setEndTime(this.endTime);
              this.EventData.setTitle(this.title);
              this.EventData.setRoom(this.rooms);
              this.EventData.setDay(this.day);
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
