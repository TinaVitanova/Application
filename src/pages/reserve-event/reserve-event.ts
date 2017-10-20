import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController } from 'ionic-angular';
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
  flagTimeEqual=false;
  flagIsNextDay=false;
  flagLowEndDate=false;
  flagAllDay: boolean=true;
  public title;
  public endTime;
  public startTime;
  public startday;
  public endday;
  public room;
  public roomName;
  public ChangeEndTime=false;
  public allDay:boolean=false;
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder, public menuCtrl: MenuController) {
    this.ReserveEventForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/[a-zA-Z0-9][\w]+\s?[\w]+$/),Validators.required])],
      startday: ['',Validators.required],
      endday: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      allDay: [''],
  });
    this.flag = this.EventData.getFlagisCalendarPage();
  }
  SelectedRoom(r){
    this.roomName = r.name;
    this.FlagRoomSelected = true;
  }
  OnTapAllDay(){
    if(this.allDay==true){
      this.flagAllDay=true;
    }
    else
    this.flagAllDay=false;
  }
  ionViewDidLoad() {
    this.showRoom = this.EventData.getShowRoom();
    this.startday = moment().toISOString();
    this.endday = moment().toISOString();
    this.ListOfRooms=this.EventData.getRoomData();
  }

  OnBlurStartDay(){
    if(this.endday<=this.startday)
    this.endday=this.startday;
    if (this.BlurStartTimeFlag == true && this.BlurEndTimeFlag == true){
    if (this.startTime > this.endTime && this.startday==this.endday)
    this.flagIsNextDay=true;
  else
    this.flagIsNextDay=false;
    }
  }
  OnBlurEndDay(){
    if (this.BlurStartTimeFlag == true && this.BlurEndTimeFlag == true){
    if (this.startTime > this.endTime && this.startday==this.endday)
    this.flagIsNextDay=true;
  else
    this.flagIsNextDay=false;
    }
    if(this.endday<this.startday)
    this.flagLowEndDate=true
    else
    this.flagLowEndDate=false;
  }
  OnBlurEndTime(){
    this.BlurEndTimeFlag = true;
    if (this.BlurStartTimeFlag == true){
      if(this.startTime == this.endTime)
        this.flagTimeEqual=true;
      else
      this.flagTimeEqual=false;
    }
    if (this.startTime > this.endTime && this.startday==this.endday)
      this.flagIsNextDay=true;
    else
      this.flagIsNextDay=false;
  }
  OnBlurStartTime(){
    this.BlurStartTimeFlag = true;
    if (this.BlurEndTimeFlag == true){
      if(this.startTime == this.endTime){
        this.flagTimeEqual=true;
      }
      else
      this.flagTimeEqual=false;
      }
      if (this.startTime > this.endTime && this.startday==this.endday)
        this.flagIsNextDay=true;
      else
        this.flagIsNextDay=false;
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
      var CheckEventEndTimeAllDay = moment(this.AllEvents[i].endTime).format("DD MM YYYY");
      var CheckEventStartTimeHours = moment(this.AllEvents[i].startTime).format("HH");
      var CheckEventStartTimeMinutes = moment(this.AllEvents[i].startTime).format("mm");
      var CheckEventEndTimeMinutes = moment(this.AllEvents[i].endTime).format("mm");
      var CheckEventEndTimeHours = moment(this.AllEvents[i].endTime).format("HH");
      var CheckStartTimeAllDay = moment(this.startday).format("DD MM YYYY");
      var startTimeHoursMinutes = this.startTime.split(':');
      var endTimeHoursMinutes = this.endTime.split(':');
        if(CheckEventStartTimeAllDay == CheckStartTimeAllDay && CheckEventEndTimeAllDay==CheckEventStartTimeAllDay){
          //ima event za 1 den na denta koga rezerviram
          if(startTimeHoursMinutes[0]!=endTimeHoursMinutes[0]){
            //mojata rezervacija e na dva dena
            if(CheckEventStartTimeHours == startTimeHoursMinutes[0]){
              //proveruva dali pochnuvaat vo ist saat
              if(CheckEventStartTimeMinutes >= startTimeHoursMinutes[1]){
                notTrue=false;
                this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                });
              }
              else if (CheckEventStartTimeMinutes < startTimeHoursMinutes[1]){
                if(CheckEventEndTimeHours==startTimeHoursMinutes[0]){
                  if(CheckEventEndTimeMinutes==startTimeHoursMinutes[1])
                  this.flagForWarning=true;
                  notTrue=true;
                  }
                  else if (CheckEventEndTimeMinutes>startTimeHoursMinutes[1]){
                    notTrue=false;
                    this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                      return item.name!=roomNameCheck;
                    });
                  }
                  else if(CheckEventEndTimeMinutes<startTimeHoursMinutes[1]){
                    notTrue=true;
                  }}
              else if (CheckEventEndTimeHours>startTimeHoursMinutes[0]){
                  notTrue=false;
                  this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                  });
              }
              }
            else if(CheckEventStartTimeHours > startTimeHoursMinutes[0]){
              notTrue=false;
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
              return item.name!=roomNameCheck;
              });
            }
            else if (CheckEventStartTimeHours < startTimeHoursMinutes[0]){
              if (CheckEventEndTimeHours == startTimeHoursMinutes[0]){
                if(CheckEventEndTimeMinutes == startTimeHoursMinutes[1]){
                  this.flagForWarning=true;
                  notTrue=true;
                }
                else if (CheckEventEndTimeMinutes < startTimeHoursMinutes[1]){
                  this.flagForWarning=true;
                  notTrue=true;
                }
                else if (CheckEventEndTimeMinutes > startTimeHoursMinutes[1]){
                  notTrue=false;
                  this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                  });
                }
              }
              else if (CheckEventEndTimeHours > startTimeHoursMinutes[0]){
                notTrue=false;
                this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                });
              }
              else if(CheckEventEndTimeHours < startTimeHoursMinutes[0]){
                notTrue=true;
              }
            }    
          }
          else if(CheckEventStartTimeHours == startTimeHoursMinutes[0]){
            //mojata rez e samo 1 den
            //pochnuvaat vo ist saat
            if(CheckEventStartTimeMinutes == startTimeHoursMinutes[1]){
              notTrue=false;
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
            else if(CheckEventStartTimeMinutes > startTimeHoursMinutes[1]){
              if(CheckEventStartTimeHours==endTimeHoursMinutes[0]){
                if(CheckEventStartTimeMinutes==endTimeHoursMinutes[0]){
                  this.flagForWarning=true;
                  notTrue=true;
                }
                else if(CheckEventStartTimeMinutes>endTimeHoursMinutes[0]){
                  notTrue=true;
                }
                else if (CheckEventStartTimeMinutes<endTimeHoursMinutes[0]){
                  notTrue=false;
                  this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                    return item.name!=roomNameCheck;
                  });
                }
              }
            }
            else if (CheckEventStartTimeMinutes < startTimeHoursMinutes[1]){
              if(CheckEventEndTimeHours==startTimeHoursMinutes[0]){
                if(CheckEventEndTimeMinutes==startTimeHoursMinutes[0]){
                  this.flagForWarning=true;
                  notTrue=true;
                }
                else if(CheckEventEndTimeMinutes>startTimeHoursMinutes[0]){
                  notTrue=false;
                  this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                    return item.name!=roomNameCheck;
                  });
                }
                else if (CheckEventEndTimeMinutes<startTimeHoursMinutes[0]){
                  notTrue=true;
                }
              }
            }
          }
          else if(CheckEventStartTimeHours > startTimeHoursMinutes[0]){
            //1 den i mojot event pochnuva porano so saat
            if (CheckEventStartTimeHours == endTimeHoursMinutes[0]){
              //mojot event zavrshuva so isti start na dr event (saat)
              if(CheckEventStartTimeMinutes == endTimeHoursMinutes[1]){
                this.flagForWarning=true;
                notTrue=true;
              }
              else if (CheckEventStartTimeMinutes > endTimeHoursMinutes[1]){
                notTrue=true;
              }
              else if (CheckEventStartTimeMinutes < endTimeHoursMinutes[1]){
                notTrue=false;
                this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                });
              }
            }
            else if(CheckEventStartTimeHours > endTimeHoursMinutes[0]){
              notTrue=true;
            }
            else if(CheckEventStartTimeHours < endTimeHoursMinutes[0]){
              notTrue=false;
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
          }
          else if (CheckEventStartTimeHours < startTimeHoursMinutes[0]){
            //1 den i mojot event pochnuva pokasno so saat
            if (CheckEventEndTimeHours == startTimeHoursMinutes[0]){
              if(CheckEventEndTimeMinutes == startTimeHoursMinutes[1]){
                this.flagForWarning=true;
                notTrue=true;
              }
              else if (CheckEventEndTimeMinutes < startTimeHoursMinutes[1]){
                this.flagForWarning=true;
                notTrue=true;
              }
              else if (CheckEventEndTimeMinutes > startTimeHoursMinutes[1]){
                notTrue=false;
                this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                  return item.name!=roomNameCheck;
                });
              }
            }
            else if (CheckEventEndTimeHours > startTimeHoursMinutes[0]){
              notTrue=false;
              this.ListOfRooms=this.ListOfRooms.filter((item) =>{
                return item.name!=roomNameCheck;
              });
            }
            else if(CheckEventEndTimeHours < startTimeHoursMinutes[0]){
              notTrue=true;
            }
          }    
    }
    else if(CheckEventEndTimeAllDay==CheckStartTimeAllDay){
      //ima event shto zavrshuva na denta koga rezerviram
      if(CheckEventEndTimeHours==startTimeHoursMinutes[0]){
        if(CheckEventEndTimeMinutes == startTimeHoursMinutes[1]){
          this.flagForWarning=true;
          notTrue=true;
        }
        else if(CheckEventEndTimeMinutes > startTimeHoursMinutes[1]){
          notTrue=false;
          this.ListOfRooms=this.ListOfRooms.filter((item) =>{
            return item.name!=roomNameCheck;
          });
        }
        else if (CheckEventEndTimeMinutes < startTimeHoursMinutes[1]){
          notTrue=true;
        }
      }
      else if(CheckEventEndTimeHours > startTimeHoursMinutes[0]){
        notTrue=false;
        this.ListOfRooms=this.ListOfRooms.filter((item) =>{
          return item.name!=roomNameCheck;
        });
      }
      else if (CheckEventEndTimeHours < startTimeHoursMinutes[0]){
        notTrue=true;
      }
    }
    else if(CheckEventEndTimeAllDay!=CheckEventStartTimeAllDay && CheckEventStartTimeAllDay==CheckStartTimeAllDay){
      //ima event shto pochnuva na den na mojot event a zavrshuva sl den
      if(CheckEventStartTimeHours<=startTimeHoursMinutes[0]){
        notTrue=false;
        this.ListOfRooms=this.ListOfRooms.filter((item) =>{
          return item.name!=roomNameCheck;
        });
      }
      else if(CheckEventStartTimeHours>startTimeHoursMinutes[0]){
        if (CheckEventStartTimeHours==endTimeHoursMinutes[1]){
          if(CheckEventStartTimeMinutes==endTimeHoursMinutes[1]){
            this.flagForWarning=true;
            notTrue=true;
          }
          else if(CheckEventStartTimeMinutes<endTimeHoursMinutes[1]){
            notTrue=false;
            this.ListOfRooms=this.ListOfRooms.filter((item) =>{
              return item.name!=roomNameCheck;
            });
          }
          else if (CheckEventStartTimeMinutes>endTimeHoursMinutes[1]){
            notTrue=true;
          }
        }
        else if (CheckEventStartTimeHours<endTimeHoursMinutes[1]){
          notTrue=false;
          this.ListOfRooms=this.ListOfRooms.filter((item) =>{
            return item.name!=roomNameCheck;
          });
        }
        else if (CheckEventStartTimeHours>endTimeHoursMinutes[1]){
          notTrue=true;
        }
      }
      else if (CheckEventStartTimeHours<startTimeHoursMinutes[0]){
        notTrue=false;
        this.ListOfRooms=this.ListOfRooms.filter((item) =>{
          return item.name!=roomNameCheck;
        });
      }
    }
    if(notTrue==true){
      this.ListOfRooms=JSON.parse(JSON.stringify(this.EventData.getRoomData()))
    }
  }
    this.isReserved=true;
  }
  save(){
    this.flag = this.EventData.getFlagisCalendarPage();

      let date = moment(this.startday).format('Do MMMM YYYY');
      let start = this.startTime;
      let end = this.endTime;
      let alert = this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '<p class="alert-title"><b>EVENT CREATED:</b><br />' + '<span>' +this.title + '</span></p><hr />',
        message: '<div class="alert-message"><b>DATE:</b> '+date+'<br><b>FROM:</b> '+start+'<br/><b>TO:</b> '+end+'<br><b>ROOM:</b> '+ this.roomName + '</div>',
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
              
            this.startday = new Date(this.startday);
            this.endday= new Date(this.endday);
            var startDate = moment(this.startTime,"hh:mm").toDate();
            var endDate = moment(this.endTime,"hh:mm").toDate();
            var startTimeEvent = new Date(this.startday.getFullYear(), this.startday.getMonth(), this.startday.getDate(), startDate.getHours(), startDate.getMinutes());
            var endTimeEvent = new Date(this.endday.getFullYear(), this.endday.getMonth(), this.endday.getDate(), endDate.getHours(), endDate.getMinutes());
            for (var i=0; i<this.FullListOfRooms.length; i++){
              if(this.FullListOfRooms[i].name == this.roomName)
                this.room = this.FullListOfRooms[i];
            }
            this.EventData.setEvent(this.title, startTimeEvent, endTimeEvent, this.allDay, this.room);
            this.isReserved=false;
              if (this.flag == true)
                this.navCtrl.pop();
                else
                this.resetForm()
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
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }

}
