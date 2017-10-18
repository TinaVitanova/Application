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
  public room;
  public allDay: boolean=false;
  public BlurEndTimeFlag;
  public BlurStartTimeFlag;
  public FlagStartEndTime = false;
  public minDate = moment().utc().format('YYYY-MM-DD').toString();
  public maxDate = moment().utc().add(30,'y').format('YYYY').toString();

  ListOfRooms = [];
   
  showRoom = this.EventData.getShowRoom();


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder) {
    this.ReserveEventForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required])],
      day: ['',Validators.compose([Validators.required])],
      startTime: ['',Validators.compose([Validators.required, new Validator(UserGlobal, EventData).isTimeDifferent])],
      endTime: ['',Validators.compose([Validators.required, new Validator(UserGlobal, EventData).isTimeDifferent])]
  });
    this.flag = this.EventData.getFlagisCalendarPage();
  

  }
  SelectedRoom(r){
    this.room = r.value;
  }
  
  ionViewDidLoad() {
    this.showRoom = this.EventData.getShowRoom();
    this.day = moment().toISOString();


    this.ListOfRooms=this.EventData.getRoomData();
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
    this.flag = this.EventData.getFlagisCalendarPage();

      let date = moment(this.day).format('Do MMMM YYYY');
      let start = this.startTime;
      let end = this.endTime;
      let alert = this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '<p class="alert-title"><b>EVENT CREATED:</b><br />' + '<span>' +this.title + '</span></p><hr />',
        message: '<div class="alert-message"><b>DATE:</b> '+date+'<br><b>FROM:</b> '+start+'<br/><b>TO:</b> '+end+'<br><b>ROOM:</b> '+ this.room + '</div>',
        buttons:[
          {
            text: 'CANCEL',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            },
            cssClass: 'alert-btn'
          },
          {
            text: 'RESERVE',
            role: 'confirm',
            handler: data => {
              
            this.day = new Date(this.day);
            var startDate = moment(this.startTime,"hh:mm").toDate();
            var endDate = moment(this.endTime,"hh:mm").toDate();
            var startTimeEvent = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), startDate.getHours(), startDate.getMinutes());
            var endTimeEvent = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), endDate.getHours(), endDate.getMinutes());
            this.EventData.setEvent(this.title, startTimeEvent, endTimeEvent, this.allDay, this.room);
              if (this.flag == true)
                this.navCtrl.pop();
                else
                this.ionViewWillEnter();
            },
            cssClass: 'alert-btn'
          }
         ]
     });
     alert.present();
  }
  ionViewWillEnter(){

  }

}
