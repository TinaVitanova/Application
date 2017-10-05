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
  room = {
    name:"",
    capacity:"",
    description:""
  }
  showRoom;
  

  CreateRoom(){
    this.EventData.SendRoomData(this.room.name, this.room.capacity, this.room.description);
    let alert = this.alertCtrl.create({
      title: 'You have created the room: ',
      subTitle: 'Room name: ' + this.room.name + '<br>Room capacity: ' + this.room.capacity + '<br>Description: ' + this.room.description,
     buttons:['OK']
   });
   alert.present();
   this.showRoom = true;
   this.EventData.setShowRoom(this.showRoom);
   }


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeRoomPage');
  }

}
