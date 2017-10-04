import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventDataProvider } from '../../providers/event-data/event-data';

/**
 * Generated class for the MakeRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-room',
  templateUrl: 'make-room.html',
})
export class MakeRoomPage {
  showRoom = this.EventData.getshowRoom();
  room = {
    name:"",
    capacity:"",
    description:""
  }

  CreateRoom(){
    this.EventData.SendRoomData(this.room.name, this.room.capacity, this.room.description);
    let alert = this.alertCtrl.create({
      title: 'You have created the room: ' + this.room.name,
     buttons:['OK']
   });
   alert.present();
   this.showRoom = true;
   }


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeRoomPage');
  }

}
