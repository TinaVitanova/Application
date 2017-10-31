import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController } from 'ionic-angular';
import * as moment from 'moment';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../validators/FormValidator';
import { ApiProvider } from '../../providers/api-provider/api-provider';

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
  IsChangeEvent;
  ChangeEvent;
  ionChecked=false;
  flagForWarning=false;
  flagTimeEqual=false;
  flagIsNextDay=false;
  flagLowEndDate=false;
  flagAllDay: boolean=false;
  flagTitle=false;
  showAvailableRooms=false;
  public FillOutForm=false;
  public title;
  public endTime="08:00";
  public startTime="07:00";
  public startday;
  public endday;
  public room: {roomId: number};
  public roomName;
  public allDay:boolean=false;
  public BlurEndTimeFlag;
  public FlagRoomSelected = false;
  public BlurStartTimeFlag;
  public FlagStartEndTime = false;
  public IndexofChangeEvent;
  public minDate = moment().utc().format('YYYY-MM-DD').toString();
  public maxDate = moment().utc().add(30,'y').format('YYYY').toString();
  public AllEvents = this.EventData.getEvents();
  public FullListOfRooms;
  reservation: {meetStarts:number,meetEnds:number,reservationTitle:string,room:Object,user:Object};
  updateReservation: {resId:number, meetStarts:number,meetEnds:number,reservationTitle:string,room:Object,user:Object};
  showRoom;


  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider, public alertCtrl: AlertController, public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder, public menuCtrl: MenuController) {
    this.ReserveEventForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/[a-zA-Z0-9][\w]+\s?[\w]+$/),Validators.required, new Validator(UserGlobal, EventData).isEventTitleValid])],
      startday: ['',Validators.required],
      endday: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
  });
    this.flag = this.EventData.getFlagisCalendarPage();
  }
  SelectedRoom(r){
    this.roomName = r.roomName;
    this.FlagRoomSelected = true;
  }
  OnTapAllDay(value){
    if(value.checked==true){
      this.flagAllDay=true;
      this.allDay=true;
      this.flagTimeEqual=false;
      this.flagIsNextDay=false;
      this.flagLowEndDate=false;
      this.FillOutForm=false;
    }
    else{
    this.flagAllDay=false;
    this.allDay=false;
    }
  }

  ionViewDidLoad() {
    this.showRoom=true;
    this.startday = moment().toISOString();
    this.endday = moment().toISOString();
  }

  onBlurTitle(){
    if(!this.title){
      this.flagTitle=false;
      this.FillOutForm=true;
    }
    else{
    this.FillOutForm=false;
    if(!this.ReserveEventForm.controls.title.valid){
      this.flagTitle=false;
    }
    else{
       this.flagTitle=true;
      this.showAvailableRooms=false;
    }
  }
  }

  OnBlurStartDay(){
    this.FillOutForm=false;
    if(this.endday<=this.startday)
    this.endday=this.startday;
    if (this.BlurStartTimeFlag == true && this.BlurEndTimeFlag == true){
    if (this.startTime > this.endTime && this.startday==this.endday){
    this.flagIsNextDay=true;
    this.showAvailableRooms=false;
    }
  else{
    this.flagIsNextDay=false;
  }
    }
  }
  OnBlurEndDay(){
    this.FillOutForm=false;
    if (this.BlurStartTimeFlag == true && this.BlurEndTimeFlag == true){
    if (this.startTime > this.endTime && this.startday==this.endday){
    this.flagIsNextDay=true;
    this.showAvailableRooms=false;
    }
  else{
    this.flagIsNextDay=false;
    }}
    if(this.endday<this.startday){
    this.flagLowEndDate=true;
    this.showAvailableRooms=false;
    }
    else{
    this.flagLowEndDate=false;
  }}
  OnBlurEndTime(){
    this.FillOutForm=false;
    this.BlurEndTimeFlag = true;
    if (this.BlurStartTimeFlag == true){
      if(this.startTime == this.endTime){
        if(this.startday==this.endday){
        this.flagTimeEqual=true;
        this.showAvailableRooms=false;
        }
        else this.flagTimeEqual=false;
      }
      else{
      this.flagTimeEqual=false;
    }}
    else if (this.startTime=="07:00"){
      if(this.startTime == this.endTime){
        if(this.startday==this.endday){
        this.flagTimeEqual=true;
        this.showAvailableRooms=false;
        }
        else this.flagTimeEqual=false;
      }
      else{
      this.flagTimeEqual=false;
    }
    }
    if (this.startTime > this.endTime && this.startday==this.endday){
      this.flagIsNextDay=true;
      this.showAvailableRooms=false;
    }
    else{
      this.flagIsNextDay=false;
    }
  }
  OnBlurStartTime(){
    this.FillOutForm=false;
    this.BlurStartTimeFlag = true;
    if (this.BlurEndTimeFlag == true){
      if(this.startTime == this.endTime){
        if(this.startday==this.endday){
        this.flagTimeEqual=true;
        this.showAvailableRooms=false;
        }
        else this.flagTimeEqual=false;
      }
      else{
      this.flagTimeEqual=false;
      }}
      else if (this.startTime=="08:00"){
        if(this.startTime == this.endTime){
          if(this.startday==this.endday){
          this.flagTimeEqual=true;
          this.showAvailableRooms=false;
          }
          else this.flagTimeEqual=false;
        }
        else{
        this.flagTimeEqual=false;
      }
      }
      if (this.startTime > this.endTime && this.startday==this.endday){
        this.flagIsNextDay=true;
        this.showAvailableRooms=false;
      }
      else{
        this.flagIsNextDay=false;
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
    if(this.flagAllDay){
      if(!this.ReserveEventForm.controls.title.valid)
        this.FillOutForm=false;
      else
        this.FillOutForm=true;
    }
    else if(!this.ReserveEventForm.valid){
      if(this.flagTimeEqual==false){
        this.FillOutForm=false;
        if(this.flagIsNextDay==false){
          this.FillOutForm=false;
          if(this.flagLowEndDate==false){
            this.FillOutForm=false;
          }
          else
          this.FillOutForm=true;
        }
        else
        this.FillOutForm=true;
      }
      else
        this.FillOutForm=true;
    }
    else this.FillOutForm=true;
    

    if(this.FillOutForm==true){
      this.showAvailableRooms=false;
    }
    else{

       this.showAvailableRooms=true;
  
  
    this.isReserved=true;
  }}
  save(){
    this.flag = this.EventData.getFlagisCalendarPage();
      let datestart = moment(this.startday).format('Do MMMM YYYY');
      let dateend = moment(this.endday).format('Do MMMM YYYY');
      let start = this.startTime;
      let end = this.endTime;
      let trueDay = '<div class="alert-message"><b>FROM:</b> '+datestart+'<br><b>UNTILL:</b> '+dateend+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName + '</div>'; 
      if(datestart == dateend){
        if(this.flagAllDay){
          trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>ALL DAY</b><br/><b>ROOM:</b> '+ this.roomName + '</div>';
        }
        else
        trueDay = '<div class="alert-message"><b>DATE:</b> '+datestart+'<br><b>TIME:</b> '+start+ ' <b>-</b> ' +end+'<br/><b>ROOM:</b> '+ this.roomName + '</div>';
      }
     let alert = this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '<p class="alert-title"><b>EVENT CREATED:</b><br />' + '<span>' +this.title + '</span></p><hr />',
        message : trueDay,
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
              if(this.flagAllDay){
                this.startday = new Date(this.startday);
                var startTimeEventAllDay = new Date(Date.UTC(this.startday.getUTCFullYear(), this.startday.getUTCMonth(), this.startday.getUTCDate()));
                var endTimeEventAllDay = new Date(Date.UTC(this.startday.getUTCFullYear(), this.startday.getUTCMonth(), this.startday.getUTCDate()+1));
                for (var i=0; i<this.FullListOfRooms.length; i++){
                  if(this.FullListOfRooms[i].name == this.roomName)
                    this.room = {roomId: this.FullListOfRooms[j].roomId};
                }
                if (this.IsChangeEvent==true){
                  this.updateReservation={resId: this.ChangeEvent.resId, meetStarts: startTimeEvent.getTime(),meetEnds: endTimeEvent.getTime(),reservationTitle:this.title,room:this.room,user:null}
                  this.apiProvider.updateReservation(this.updateReservation);
                 // this.EventData.updateEvent(this.reservation,this.IndexofChangeEvent);
                  this.isReserved=false;
                  this.navCtrl.pop()
                }
                else{
                this.reservation={meetStarts: startTimeEventAllDay.getTime()- 3600 * 1000,meetEnds: endTimeEventAllDay.getTime()- 3600 * 1000,reservationTitle:this.title,room:this.room,user:null}
                this.apiProvider.addReservation(this.reservation);
               // this.EventData.addEvent(this.reservation);
                this.isReserved=false;
                if (this.flag == true)
                this.navCtrl.pop();
                else
                this.resetForm()
                } 
              }
              else{
            this.startday = new Date(this.startday);
            this.endday= new Date(this.endday);
            var startDate = moment(this.startTime,"hh:mm").toDate();
            var endDate = moment(this.endTime,"hh:mm").toDate();
            var startTimeEvent = new Date(this.startday.getFullYear(), this.startday.getMonth(), this.startday.getDate(), startDate.getHours(), startDate.getMinutes());
            var endTimeEvent = new Date(this.endday.getFullYear(), this.endday.getMonth(), this.endday.getDate(), endDate.getHours(), endDate.getMinutes());
            for (var j=0; j<this.FullListOfRooms.length; j++){
              if(this.FullListOfRooms[j].name == this.roomName)
                this.room = {roomId: this.FullListOfRooms[j].roomId};
            }
            if (this.IsChangeEvent==true){
              this.updateReservation={resId: this.ChangeEvent.resId,meetStarts: startTimeEvent.getTime(),meetEnds: endTimeEvent.getTime(),reservationTitle:this.title,room:this.room,user:null}
              this.apiProvider.updateReservation(this.updateReservation);
            //  this.EventData.updateEvent(this.reservation,this.IndexofChangeEvent);
              this.isReserved=false;
              this.navCtrl.pop();
            }
            else{
              this.reservation={meetStarts: startTimeEvent.getTime(),meetEnds: endTimeEvent.getTime(),reservationTitle:this.title,room:this.room,user:null}
            this.apiProvider.addReservation(this.reservation);
           // this.EventData.addEvent(this.reservation);
            this.isReserved=false;
            if (this.flag == true)
            this.navCtrl.pop();
            else
            this.resetForm()
            } 
              }
            },
            cssClass: 'alert-btn'
          }
         ]
     });
     alert.present();
     this.FlagRoomSelected=false;
  }
  resetForm(){
    this.ReserveEventForm.reset();
    this.startday = moment().toISOString();
    this.endday= moment().toISOString();
    this.endTime="08:00";
    this.startTime="07:00";
    this.showAvailableRooms=false;
  }
  ionViewWillEnter(){
    
     this.IsChangeEvent=this.EventData.getIsChangeEvent();
     this.ChangeEvent=this.EventData.getChangeEvent();
     if(this.IsChangeEvent==true){
       
     this.IndexofChangeEvent=this.EventData.getIndexOfChangeEvent();
       this.title=this.ChangeEvent.title;
       if(this.ChangeEvent.allDay){
       this.ionChecked=true;
      this.flagAllDay=true;
      this.allDay=true;
      this.flagTimeEqual=false;
      this.flagIsNextDay=false;
      this.flagLowEndDate=false;
       }
       this.startday=this.ChangeEvent.startDate;
       this.endday=this.ChangeEvent.endDate;
       this.startTime=moment(this.ChangeEvent.startTime).format("HH:mm").toString();
       this.endTime=moment(this.ChangeEvent.endTime).format("HH:mm").toString();
     }

  }

  ionViewDidEnter(){
    this.FullListOfRooms=this.EventData.getRooms();
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }

}
