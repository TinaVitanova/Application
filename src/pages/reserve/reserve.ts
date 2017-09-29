import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
/**
 * Generated class for the ReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {
  myDate: String = new Date().toISOString();
  myTime: String = new Date().toISOString();

  rooms:"";
  isReserved: boolean;

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), chosenDate: new Date().toISOString()}
  minDate = new Date().toISOString();
  
  shouldHide(){
    if(this.isReserved==true)
    return false;
    else
    return true;
  }

  findRoom(){
    this.isReserved=true;
  }
  
  reserve() {
    let confirm = this.alertCtrl.create({
      title: 'You have chosen: ',

      message: 'Date:'+this.event.chosenDate+'<br>Start Time: '+this.event.startTime+'<br>End Time: '+this.event.endTime+'<br> Room:'+this.rooms+'<br>',
      
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
    

     this.navCtrl.push(ReservePage, {date: this.event.chosenDate, start: this.event.startTime, end: this.event.endTime, room: this.rooms});

  }
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    
    this.event.chosenDate = navParams.get('date');
    this.event.startTime = navParams.get('start');
    this.event.endTime = navParams.get('end');
    this.rooms = navParams.get('room');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

  save(){
    this.viewCtrl.dismiss(this.event);
  }

}
