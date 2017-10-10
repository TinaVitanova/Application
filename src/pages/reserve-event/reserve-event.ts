import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../validators/FormValidator';

@IonicPage()
@Component({
  selector: 'page-reserve-event',
  templateUrl: 'reserve-event.html',
})
export class ReserveEventPage {
  submitAttempt: boolean = false;
  ReserveEventForm: FormGroup;
  isReserved: boolean;
  flag;
  public title;
  public endTime;
  public startTime;
  public day;
  public BlurEndTimeFlag;
  public BlurStartTimeFlag;
  public FlagStartEndTime = false;
  public minDate = moment().utc().format('YYYY-MM-DD').toString();
  public maxDate = moment().utc().add(30,'y').format('YYYY').toString();

  rooms:"";
  ListOfRooms = [];
   
  showRoom = this.EventData.getShowRoom();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder) {
    this.ReserveEventForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required])],
      day: ['',Validators.compose([Validators.required])],
      startTime: ['',Validators.compose([Validators.required])],
      endTime: ['',Validators.compose([Validators.required, new Validator(UserGlobal, EventData).isTimeDifferent])]
  });
    this.flag = this.EventData.getFlag();
  
  }

  loadEvents(){  
  this.EventData.getLoadEvents();
  }
  
  ionViewDidLoad() {
    this.showRoom = this.EventData.getShowRoom();

    this.day = moment().toISOString();

    this.ListOfRooms.push(this.EventData.getRoomData());
  }
  OnBlurEndTime(){
    this.BlurEndTimeFlag = true;
    if (this.BlurStartTimeFlag == true){
    this.FlagStartEndTime = this.EventData.checkEndTime(this.endTime);
    this.EventData.setFlagStartEndTime(this.FlagStartEndTime);
    }
  }
  OnBlurStartTime(){
    this.BlurStartTimeFlag = true;
    if (this.BlurEndTimeFlag == true){
    this.FlagStartEndTime = this.EventData.checkStartTime(this.startTime);
    this.EventData.setFlagStartEndTime(this.FlagStartEndTime);
    }
  }

  showRooms(){
    return this.showRoom;
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
  save(){
    this.flag = this.EventData.getFlag();

      let date = moment(this.day).format('Do MMMM YYYY');
      let start = this.startTime;
      let end = this.endTime;
      console.log(new Date() + '    rthsrh   ')
      if (start==end || start == new Date()){
        let alert = this.alertCtrl.create({
          title: 'Error!',
          message: 'You have not added a start and end time for your event',
          buttons:["OK"]
       });
       alert.present();
      }
      else{
      let alert = this.alertCtrl.create({
        title: 'You have created an event: ' + this.title,
        message: 'On: '+date+'<br>From: '+start+'<br>To: '+end+'<br> Room:'+ this.rooms + '</div>',
        buttons:[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Reserve',
            role: 'confirm',
            handler: data => {
              this.EventData.setStartTime(this.startTime);
              this.EventData.setEndTime(this.endTime);
              this.EventData.setTitle(this.title);
              this.EventData.setRoom(this.rooms);
              this.EventData.setDay(this.day);
              console.log('Created new event');
              if (this.flag == true)
                this.navCtrl.pop();
                else
                this.ionViewWillEnter();
            }
          }
         ]
     });
     alert.present();
    }
  }
  ionViewWillEnter(){

  }

}
