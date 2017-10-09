import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  MakeRoomForm: FormGroup;
  submitAttempt: boolean = false;

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public formBuilder: FormBuilder) {
    this.MakeRoomForm = formBuilder.group({
      RoomName: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required])],
      Capacity: ['',Validators.compose([Validators.required])],
      Description: ['',Validators.compose([Validators.required,Validators.maxLength(300)])]
  });
  }

  ionViewDidLoad() {
  }

}
