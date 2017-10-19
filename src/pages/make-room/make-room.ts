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
    
    let alert = this.alertCtrl.create({
      cssClass: 'alert-style',
      title: '<p class="alert-title"><b>USER CREATED:</b><br /></p><hr />',
      subTitle: '<div class="alert-message"><b>ROOM NAME:</b> ' + this.name + 
      '<br><b>ROOM CAPACITY:</b> ' + this.capacity + 
      '<br><b>ROOM DESCRIPTION:</b> ' + this.description + '</div>',  
     buttons:[
        {
      cssClass: 'alert-btn',
      text: 'CANCEL',
      role: 'cancel',
      },
      {
      cssClass: 'alert-btn',
      text: 'CONFIRM',
      role: 'confirm',
        handler: data => {
          this.showRoom = true;
          this.EventData.SendRoomData(this.name, this.capacity, this.description);
          this.EventData.setShowRoom(this.showRoom);
          this.MakeRoomForm.reset();
        }
      }
    ]
   });
   alert.present();
   }


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider) {
    this.MakeRoomForm = formBuilder.group({
      RoomName: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9]*'),Validators.required,new Validator(UserGlobal, EventData).isRoomValid])],
      Capacity: ['',Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      Description: ['',Validators.compose([Validators.maxLength(300)])]
  });
  
  }

  ionViewDidLoad() {
  }

}
