import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api-provider/api-provider';

@Injectable()
export class EventDataProvider {
  public flag;
  public RoomsData: {name: string, capacity: string, description: string};
  public Eventdata: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object};
  public AllEvents: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object}[]=[];
  public AllEventsFinal: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object}[]=[];
  public FullRooms: {name: string, capacity: string, description: string}[]=[];
  public ShowRoom: boolean = false;
  public loadEvent;
  public IsChangeEvent=false;
  public changeEvent;
  public FlagStartEndTime;
  reservations;
  constructor(public storage: Storage, public apiProvider: ApiProvider) {
  } 
  public checkRoomName(value){
    for (var i=0; i<this.FullRooms.length; i++){
      if (this.FullRooms[i].name == value)
      return true;
    }
    return false;
  }

  public setShowRoom(value: boolean){
    this.ShowRoom = value;
  }

  public getShowRoom(){
    return this.ShowRoom;
  }
  public deleteEvent(event){
    for (var i=0; i<this.AllEvents.length;i++){
      if(event.title==this.AllEvents[i].title){
        this.AllEvents.splice(i,1);
        break;
      }
    }
  }
  // public setIsChangeEvent(value){
  //   this.IsChangeEvent=value;
  // }
  // public setChangeEvent(value){
  //   this.changeEvent=value;
  // }
  // public getChangeEvent(){
  //   return this.changeEvent;
  // }
  // public getIsChangeEvent(){
  //   return this.IsChangeEvent;
  // }


  
  public getRoomName(i){
    var roomName;
    for (var j=0; j<this.AllEvents.length; j++){
      for (var k=0; k<this.FullRooms.length; k++){
      if(this.AllEvents[j].room == this.FullRooms[k] && this.AllEvents[i]==this.AllEvents[j])
      roomName = this.FullRooms[k].name;
    }}
    return roomName;
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
 this.apiProvider.getReservations()
    .then(data => {
      this.reservations = data;
      console.log (this.reservations)
    });
    this.Eventdata = {title: value1, startTime: value2, endTime: value3, allDay: value4, room: value5};
    this.AllEvents.push(this.Eventdata);
  }

  public getEvents(){
    this.AllEvents=[];
    this.apiProvider.getReservations()
    .then(data => {
      this.reservations = data;
      for(var i=0;i<this.reservations.length;i++){
        this.Eventdata = {title: this.reservations[i].reservationTitle, startTime: this.reservations[i].meetStarts, endTime: this.reservations[i].meetEnds, allDay: this.reservations[i].allDay, room: this.reservations[i].room};
        this.AllEvents.push(this.Eventdata);
      }
      console.log(this.AllEvents)
    });
    
    console.log(this.AllEvents)
    return this.AllEvents;
    
  }
}
