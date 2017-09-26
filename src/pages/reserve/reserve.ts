import { ViewController } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import moment from 'moment';
=======
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
>>>>>>> 3142a121718149b392d73e659abb3db1d75bb0c1
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
  capacity:"";
  isReserved: boolean;
<<<<<<< HEAD
  event = { statTime: new Date().toISOString(), endTime: new Date().toISOString()}
  minDate = new Date().toISOString();
  
  AddReserve(){
    /*
    var event = [];
    var date = this.myDate;
    var time = this.myTime;
    var rooms = this.rooms;
    var startDay = this.myDate;
    var startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
    event.push([
=======
>>>>>>> 3142a121718149b392d73e659abb3db1d75bb0c1

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString()}
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
      message: '<div>Date:'+this.myDate+'<br> Time:'+this.myTime+'<br> Capacity:'+this.capacity+'<br> Room:'+this.rooms+'</div>',
      
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
    
      this.navCtrl.push(ReservePage, {date: this.myDate, time: this.myTime, capacity: this.capacity, room: this.rooms});
  }
  
<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController ) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.statTime = preselectedDate;
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
>>>>>>> 3142a121718149b392d73e659abb3db1d75bb0c1
    this.event.endTime = preselectedDate;
    
    this.myDate = navParams.get('date');
    this.myTime = navParams.get('time');
    this.capacity = navParams.get('capacity');
    this.rooms = navParams.get('room');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

  save(){
    this.viewCtrl.dismiss(this.event);
  }
<<<<<<< HEAD
}
=======

}
>>>>>>> 3142a121718149b392d73e659abb3db1d75bb0c1
