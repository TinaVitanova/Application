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
  constructor(public storage: Storage) {
    console.log('Hello EventData Provider');
  }
  public setTitle(value){
  this.storage.set(this.Title,value);
  this.Title = value;
  }
  public setStartTime(value1){
  this.storage.set(this.StartTime,value1);
  this.StartTime = value1;
  }
  public setEndTime(value2){
  this.storage.set(this.EndTime,value2);
  this.EndTime = value2;
  }
  public setRoom(value3){
  this.storage.set(this.Room,value3);
  this.Room = value3;
  }
  public getTitle(){
    return this.Title;
  }
  public getStartTime() {
    return this.StartTime;
  }
  public getEndTime() {
    return this.EndTime;
  }
  public getRoom() {
    return this.Room;
  }

}
