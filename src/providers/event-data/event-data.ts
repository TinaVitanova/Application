import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import * as moment from 'moment';

@Injectable()
export class EventDataProvider {

  public StartTime;
  public EndTime;
  public Room;
  public flag;
  public Title;
  public Day;
  public events = [];
  public RoomsData: {name: string, capacity: string, description: string};
  public FullRooms = {};
  public ShowRoom: boolean = false;
  public loadEvent;
  public FlagStartEndTime;
  constructor(public storage: Storage) {
  } 

  public setLoadEvents(value){
    this.loadEvent = value;
  }

  public getLoadEvents(){
    return this.loadEvent;
  }

  public setShowRoom(value: boolean){
    this.ShowRoom = value;
  }

  public getShowRoom(){
    return this.ShowRoom;
  }

  public setFlag(value){
    this.flag=value;
  }

  public getFlag(){
    return this.flag;
  }

  public getRoomData(){
    return this.FullRooms;
  }

  public SendRoomData(value:string, value1:string, value2: string){
    this.RoomsData = {name: value, capacity: value1, description: value2}
    this.FullRooms = this.RoomsData;
  }

  public setTitle(value){
  this.Title = value;
  }

  public setDay(value){
    this.Day=value;
  }

  public setStartTime(value1){
  this.StartTime = value1;
  }

  public setEndTime(value2){
  this.EndTime = value2;
  }

  public setRoom(value3){
  this.Room = value3;
  }

  public setEvents(value: any){
    this.events = value;
  }


  public getTitle(){
    return this.Title;
  }

  public getDay(){
    return this.Day;
  }

  public getStartTime() {
    return this.StartTime;
  }

  public getEndTime() {
    return this.EndTime;
  }

  public getEvents(){
    return this.events;
  }
  
  public getRoom() {
    return this.Room;
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
