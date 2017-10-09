import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import * as moment from 'moment';

/*
  Generated class for the EventDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
  constructor(public storage: Storage) {
    console.log('Hello EventData Provider');

  } 

  public setLoadEvents(value){
    this.loadEvent = value;
  }

  public getLoadEvents(){
    return this.loadEvent;
  }

  public setShowRoom(value: boolean){
    console.log('jas sum value na showRoom ' + value);
    this.ShowRoom = value;
  }

  public getShowRoom(){
    console.log('AJDE BE ' + this.ShowRoom);
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
    console.log('u provider: '+ this.RoomsData.name + ' '+ this.RoomsData.capacity + ' '+ this.RoomsData.description);
    this.FullRooms = this.RoomsData;
    console.log('the array in provider issss!: '+ this.FullRooms)
  }

  public setTitle(value){
  console.log('title ' +value);
  this.Title = value;
  }
  public setDay(value){
    this.Day=value;
  }
  public setStartTime(value1){
  console.log('startTime ' +value1);
  this.StartTime = value1;
  }
  public setEndTime(value2){
  console.log('endTime ' +value2);
  this.EndTime = value2;
  }
  public setRoom(value3){
  console.log('room ' +value3);
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

}
