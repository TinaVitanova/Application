import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import * as moment from 'moment';

@Injectable()
export class EventDataProvider {

  public flag;
  public RoomsData: {name: string, capacity: string, description: string};
  public Eventdata: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object};
  public AllEvents: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object}[]=[];
  public FullRooms: {name: string, capacity: string, description: string}[]=[];
  public ShowRoom: boolean = false;
  public loadEvent;
  public FlagStartEndTime;
  constructor(public storage: Storage) {
  } 

  public setLoadEvents(value, value1){
    this.Eventdata = {title: value.title, startTime: value.startTime, endTime: value.endTime, allDay: value.allDay, room: value1};
  }

  public getLoadEvents(){
    return this.Eventdata;
  }

  public setShowRoom(value: boolean){
    this.ShowRoom = value;
  }

  public getShowRoom(){
    return this.ShowRoom;
  }

  public setFlagIsCalendarPage(value){
    this.flag=value;
  }

  public getFlagisCalendarPage(){
    return this.flag;
  }

  public SendRoomData(value:string, value1:string, value2: string){
    this.RoomsData = {name: value, capacity: value1, description: value2};
    this.FullRooms.push(this.RoomsData);
  }

  public getRoomData(){
    return this.FullRooms;
  }

  public setEvent(value1,value2,value3,value4,value5){
    this.Eventdata = {title: value1, startTime: value2, endTime: value3, allDay: value4, room: value5};
    this.AllEvents.push(this.Eventdata);
  }

  public getEvents(){
    return this.AllEvents;
  } 
  public checkStartTime(value){
    var checkStartTime = value;
    if (checkStartTime == this.checkEndTime)
    return true;
    else return false;
  }
  public checkEndTime(value){
    var checkEndTime = value;
    if (this.checkStartTime == checkEndTime)
    return true;
    else return false;
  }
  public setFlagStartEndTime(value){
    this.FlagStartEndTime = value;
  }
  public getFlagStartEndTime(){
    return this.FlagStartEndTime;
  }
}
