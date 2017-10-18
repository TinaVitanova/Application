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
  flagForWarning=false;
  public title;
  public endTime;
  public startTime;
  public day;
  public room;
  public roomName;
  public allDay: boolean=false;
  public BlurEndTimeFlag;
  public FlagRoomSelected = false;
  public BlurStartTimeFlag;
  public FlagStartEndTime = false;
  public minDate = moment().utc().format('YYYY-MM-DD').toString();
  public maxDate = moment().utc().add(30,'y').format('YYYY').toString();
  public AllEvents = this.EventData.getEvents();
  public FullListOfRooms = this.EventData.getRoomData();
  public ListOfRooms=JSON.parse(JSON.stringify(this.FullListOfRooms));
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
    this.FlagRoomSelected = true;
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
    var notTrue=true;
    for(var i=0;i<this.AllEvents.length;i++){
      var roomCheck = this.AllEvents[i].room;
      var roomNameCheck = this.EventData.getRoomName(i);
      var CheckEventStartTimeAllDay = moment(this.AllEvents[i].startTime).format("DD MM YYYY");
      //var CheckEventStartTimeAllTime = moment(this.AllEvents[i].startTime).format("HH:mm");
      var CheckEventStartTimeHours = moment(this.AllEvents[i].startTime).format("HH");
      var CheckEventStartTimeMinutes = moment(this.AllEvents[i].startTime).format("mm");
      var CheckEventEndTimeMinutes = moment(this.AllEvents[i].endTime).format("mm");
      var CheckEventEndTimeHours = moment(this.AllEvents[i].endTime).format("HH");
      var CheckStartTimeAllDay = moment(this.day).format("DD MM YYYY");
      var startTimeHoursMinutes = this.startTime.split(':');
      var endTimeHoursMinutes = this.endTime.split(':');
        if(CheckEventStartTimeAllDay == CheckStartTimeAllDay){
          console.log('CheckEventStartTimeAllDay == CheckStartTimeAllDay');
          if(CheckEventStartTimeHours == startTimeHoursMinutes[0]){
            console.log('CheckEventStartTimeHours == startTimeHoursMinutes[0]');
            if(CheckEventStartTimeMinutes == startTimeHoursMinutes[1]){
              console.log('CheckEventStartTimeMinutes == startTimeHoursMinutes[1]');
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
            else if(CheckEventStartTimeMinutes > startTimeHoursMinutes[1]){
              console.log('CheckEventStartTimeMinutes > startTimeHoursMinutes[1]')
              notTrue=true;
              break;
            }
            else if (CheckEventStartTimeMinutes < startTimeHoursMinutes[1]){
              console.log('CheckEventStartTimeMinutes < startTimeHoursMinutes[1]')
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
          }
          else if(CheckEventStartTimeHours > startTimeHoursMinutes[0]){
            console.log('CheckEventStartTimeHours > startTimeHoursMinutes[0]')
            if (CheckEventStartTimeHours == endTimeHoursMinutes[0]){
              console.log('CheckEventStartTimeHours == endTimeHoursMinutes[0]')
              if(CheckEventStartTimeMinutes == endTimeHoursMinutes[1]){
                console.log('CheckEventStartTimeMinutes == endTimeHoursMinutes[1]')
                this.flagForWarning=true;
                notTrue=true;
                break;
              }
              else if (CheckEventStartTimeMinutes > endTimeHoursMinutes[1]){
                console.log('CheckEventStartTimeMinutes > endTimeHoursMinutes[1]')
                notTrue=true;
                break;
              }
              else if (CheckEventStartTimeMinutes < endTimeHoursMinutes[1]){
                console.log('CheckEventStartTimeMinutes < endTimeHoursMinutes[1]')
                this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                });
              }
            }
            else if(CheckEventStartTimeHours > endTimeHoursMinutes[0]){
              notTrue=true;
              break;
            }
            else if(CheckEventStartTimeHours < endTimeHoursMinutes[0]){
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
          }
          else if (CheckEventStartTimeHours < startTimeHoursMinutes[0]){
            if (CheckEventEndTimeHours == startTimeHoursMinutes[0]){
              this.flagForWarning=true;
              notTrue=true;
              break;
            }
            else if (CheckEventEndTimeHours > startTimeHoursMinutes[0]){
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
            else if(CheckEventEndTimeHours < startTimeHoursMinutes[0]){
              notTrue=true;
              break;
            }
          }    
    }
    if(notTrue==true){
      console.log('if so vrakjanje na sobi i list of rooms: '+ this.ListOfRooms)
      this.ListOfRooms=JSON.parse(JSON.stringify(this.EventData.getRoomData()))
      console.log(this.EventData.getRoomData()+ '  ova e od event data a ova e od list of rooms: '+ this.ListOfRooms)
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
            for (var i=0; i<this.FullListOfRooms.length; i++){
              if(this.FullListOfRooms[i].name == this.roomName)
                this.room = this.FullListOfRooms[i];
                console.log('vo reserve event sobata: ' + this.room)
            }
            this.EventData.setEvent(this.title, startTimeEvent, endTimeEvent, this.allDay, this.room);
            this.isReserved=false;
              if (this.flag == true)
                this.navCtrl.pop();
                else
                this.ionViewWillEnter();
            }
          }
         ]
     });
     alert.present();
     this.FlagRoomSelected=false;
  }
  ionViewWillEnter(){

  }

}
