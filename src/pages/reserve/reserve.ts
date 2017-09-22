import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  
  AddReserve(){
    /*
    var event = [];
    var date = this.myDate;
    var time = this.myTime;
    var rooms = this.rooms;
    var startDay = this.myDate;
    var startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
    event.push([

    ])
    return event;
    */
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
  
  reserve() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Reserve room',
      
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
            this.AddReserve();
          }
        }
      ]
    });
    confirm.present();
<<<<<<< HEAD
    
      this.navCtrl.push(ReservePage, {date: this.myDate});
      this.navCtrl.push(ReservePage, {time: this.myTime});
      this.navCtrl.push(ReservePage, {capacity: this.capacity});
      this.navCtrl.push(ReservePage, {room: this.rooms});
    
=======
>>>>>>> parent of 99427a4... reserve
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

}
