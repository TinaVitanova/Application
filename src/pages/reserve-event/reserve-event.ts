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
  public roomName;
  public allDay: boolean=false;
  public BlurEndTimeFlag;
  public BlurStartTimeFlag;
  public FlagStartEndTime = false;
  public minDate = moment().utc().format('YYYY-MM-DD').toString();
  public maxDate = moment().utc().add(30,'y').format('YYYY').toString();
  public AllEvents = this.EventData.getEvents();
  public ListOfRooms=this.EventData.getRoomData();
   
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
    this.roomName = r.name;
  }
  
  ionViewDidLoad() {
    this.showRoom = this.EventData.getShowRoom();
    this.day = moment().toISOString();
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
    for(var i=0;i<this.AllEvents.length;i++){
      var roomCheck = this.AllEvents[i].room;
      var roomNameCheck = this.EventData.getRoomName(i);
      var CheckEventStartTimeAllDay = moment(this.AllEvents[i].startTime).format("DD MM YYYY");
      var CheckEventStartTimeAllTime = moment(this.AllEvents[i].startTime).format("HH:mm");
      var CheckStartTimeAllDay = moment(this.day).format("DD MM YYYY");
      for(var j=0;j<this.ListOfRooms.length;i++){
        console.log(roomNameCheck + ' <ime soba   ime soba so proveruva> '+ this.ListOfRooms[j].name +'    '+ CheckEventStartTimeAllDay + '  <den  den so proveruva>  '+ CheckStartTimeAllDay + '  '+ CheckEventStartTimeAllTime +' <vreme vremeso proveruva>   ' + this.startTime)
        if(roomNameCheck == this.ListOfRooms[j].name){
          console.log('se desilo prv if')
          if(CheckEventStartTimeAllDay == CheckStartTimeAllDay){
            console.log('se desilo vtor if')
            if(CheckEventStartTimeAllTime == this.startTime){
          this.ListOfRooms.splice(j,1);
          console.log('se desilo splice')
        }
        else break; 
      }
      else break;
    }
     else break;
        
  
      }
    }


    this.isReserved=true;



  }
  save(){
    this.flag = this.EventData.getFlagisCalendarPage();

      let date = moment(this.day).format('Do MMMM YYYY');
      let start = this.startTime;
      let end = this.endTime;
      let alert = this.alertCtrl.create({
        title: 'You have created an event: ' + this.title,
        message: 'On: '+date+'<br>From: '+start+'<br>To: '+end+'<br> Room:'+ this.roomName + '</div>',
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
              
            this.day = new Date(this.day);
            var startDate = moment(this.startTime,"hh:mm").toDate();
            var endDate = moment(this.endTime,"hh:mm").toDate();
            var startTimeEvent = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), startDate.getHours(), startDate.getMinutes());
            var endTimeEvent = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), endDate.getHours(), endDate.getMinutes());
            for (var i=0; i<this.ListOfRooms.length; i++){
              if(this.ListOfRooms[i].name == this.roomName)
                this.room = this.ListOfRooms[i];
                console.log('vo reserve event sobata: ' + this.room)
            }
            this.EventData.setEvent(this.title, startTimeEvent, endTimeEvent, this.allDay, this.room);
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
  ionViewWillEnter(){

  }

}
