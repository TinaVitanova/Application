import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventDataProvider } from '../../providers/event-data/event-data';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../validators/FormValidator';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@IonicPage()
@Component({
  selector: 'page-make-room',
  templateUrl: 'make-room.html',
})
export class MakeRoomPage {
 
    name;
    capacity;
    description;

  showRoom;
  MakeRoomForm: FormGroup;
  submitAttempt: boolean = false;

  CreateRoom(){
    if (!this.description)
    this.description = "No Description";
    this.EventData.SendRoomData(this.name, this.capacity, this.description);
    let alert = this.alertCtrl.create({
      title: 'You have created the room: ',
      subTitle: 'Room name: ' + this.name + '<br>Room capacity: ' + this.capacity + '<br>Description: ' + this.description,
     buttons:['OK']
   });
   alert.present();
   this.showRoom = true;
   this.EventData.setShowRoom(this.showRoom);

   }


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider) {
    this.MakeRoomForm = formBuilder.group({
      RoomName: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9]*'),Validators.required,new Validator(UserGlobal, EventData).isRoomValid])],
      Capacity: ['',Validators.compose([Validators.required])],
      Description: ['',Validators.compose([Validators.maxLength(300)])]
  });
  }

  ionViewDidLoad() {
  }

}
