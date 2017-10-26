import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
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
  
  flagCorrectName:boolean=false;
  flagCorrectCapacity:boolean=false;
  flagIncorrectRoomName:boolean = false;
  flagIncorrectRoomCapacity:boolean = false;
  
  showRoom;
  MakeRoomForm: FormGroup;
  submitAttempt: boolean = false;
  
  onFocus(){
    if(!this.MakeRoomForm.valid){
      if(!this.MakeRoomForm.controls.RoomName.valid){
        this.flagIncorrectRoomName = true; 
        this.flagCorrectName=false;
      }
      else{
      this.flagIncorrectRoomName = false; 
        this.flagCorrectName=true;
      }
  
      if(!this.MakeRoomForm.controls.Capacity.valid){
        this.flagIncorrectRoomCapacity = true;
        this.flagCorrectCapacity=false;
    
      }else{
        this.flagIncorrectRoomCapacity = false;
        this.flagCorrectCapacity=true;
      }
    }
  }

  CreateRoom(){
    if(this.MakeRoomForm.valid){   
      if (!this.description){
        this.description = "No Description";
      }
      this.flagIncorrectRoomName = false;
      this.flagIncorrectRoomCapacity = false;

      let alert = this.alertCtrl.create({
      
        cssClass: 'alert-style',
        title: '<p class="alert-title"><b>ROOM CREATED:</b><br /></p><hr />',
        subTitle: '<div class="alert-message"><b>ROOM NAME:</b> ' + this.name + 
        '<br><b>ROOM CAPACITY:</b> ' + this.capacity + 
        '<br><b>DESCRIPTION:</b> ' + this.description + '</div>',  
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
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public formBuilder: FormBuilder, public UserGlobal: UsernameGlobalProvider, public menuCtrl: MenuController) {
    this.MakeRoomForm = formBuilder.group({
      RoomName: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/[a-zA-Z0-9][\w]+\s?[\w]+$/),Validators.required,new Validator(UserGlobal, EventData).isRoomValid])],
      Capacity: ['',Validators.compose([Validators.required, Validators.pattern(/[\d]+/)])],
      Description: ['',Validators.compose([Validators.maxLength(300)])]
    });
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }
}
