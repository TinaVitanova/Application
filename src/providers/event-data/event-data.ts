import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  public Title;
  public AllRooms: Array<{title: string, number: number}>;
  constructor(public storage: Storage) {
    console.log('Hello EventData Provider');

  }
  public AddRoom(title:string, number: number){
    this.AllRooms;
  }
  public setTitle(value){
  console.log('title ' +value);
  this.Title = value;
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
  public getTitle(){
    return this.Title;
  }
  public getStartTime() {
    console.log('In enevt provider: ', this.StartTime);
    return this.StartTime;
  }
  public getEndTime() {
    return this.EndTime;
  }
  public getRoom() {
    return this.Room;
  }

}
