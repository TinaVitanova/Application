import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeRoomPage');
  }

}
