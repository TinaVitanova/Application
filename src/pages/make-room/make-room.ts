import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  CreateRoom(){
    console.log('prakjam room data so klikanje na jebeno kopche '+ this.room.name+ ' ' + this.room.capacity + ' '+ this.room.description);
    this.EventData.SendRoomData(this.room.name, this.room.capacity, this.room.description);
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public EventData: EventDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeRoomPage');
  }

}
