import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api-provider/api-provider';

@Injectable()
export class EventDataProvider {
  public flag;
  public RoomsData: {roomId:number, name: string, capacity: string, description: string};
  // public RoomsDataFinal: {name: string, capacity: string, description: string};
  public Eventdata: {resId: number, title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object};
  // public EventdataFinal: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object};
  public AllEvents: {resId: number, title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object}[]=[];
  // public AllEventsFinal: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object}[]=[];
  public FullRooms: {roomId: number, name: string, capacity: string, description: string}[]=[];
  // public FullRoomsFinal: {name: string, capacity: string, description: string}[]=[];
  public loadEvent;
  public IsChangeEvent=false;
  public IndexOfchangeEvent;
  public changeEvent;
  public FlagStartEndTime;
  reservations;
  rooms;
  constructor(public storage: Storage, public apiProvider: ApiProvider) {
  } 
  public checkRoomName(value){
    for (var i=0; i<this.FullRooms.length; i++){
      if (this.FullRooms[i].name == value)
      return true;
    }
    return false;
  }
   public setIsChangeEvent(value){
     this.IsChangeEvent=value;
   }
   public setChangeEvent(value){
     this.changeEvent=value;
   }
   public getChangeEvent(){
     return this.changeEvent;
   }
   public getIsChangeEvent(){
     return this.IsChangeEvent;
   }
   public setIndexOfChangeEvent(value){
      this.IndexOfchangeEvent=value;
   }
   public getIndexOfChangeEvent(){
     return this.IndexOfchangeEvent;
   }


  
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

  // public SendRoomData(value:string, value1:string, value2: string){
  //   this.RoomsDataFinal = {name: value, capacity: value1, description: value2};
  //   this.FullRoomsFinal.push(this.RoomsDataFinal);
  // }

  // public getRoomData(){
  //   return this.FullRoomsFinal;
  // }

  public getRooms(){
    this.FullRooms=[];
    this.apiProvider.getRooms()
    .then(data => {
      this.rooms = data;
      console.log(data)
      console.log(this.rooms)
      for(var i=0;i<this.rooms.length;i++){
        this.RoomsData = {roomId: this.rooms[i].roomId, name: this.rooms[i].roomName, capacity: this.rooms[i].capacity, description: this.rooms[i].description};
        this.FullRooms.push(this.RoomsData);
      }
    });
    // this.FullRoomsFinal=this.FullRooms;
    return this.FullRooms;        
  }

  public checkTitle(value){
    for(var i=0;i<this.AllEvents.length;i++){
      if(value==this.AllEvents[i].title){
        return true;
      }
    }
    return false;
    
  }

  
  public deleteEvent(event){
    this.apiProvider.deleteReservation(event.resId)
  }

  // public updateEvent(event, index){
  //   this.AllEventsFinal.splice(index,1);
  //   this.EventdataFinal = {title: event.reservationTitle, startTime: event.meetStarts, endTime: event.meetEnds, allDay: event.allDay, room: event.room};
  //   this.AllEventsFinal.push(this.Eventdata);
  // }

  // public addEvent(event){
  //   this.EventdataFinal = {title: event.reservationTitle, startTime: event.meetStarts, endTime: event.meetEnds, allDay: event.allDay, room: event.room};
  //   this.AllEventsFinal.push(this.Eventdata);
  // }

  // public getAllEvent(){
  //   return this.AllEventsFinal;
  // }

  public getEvents(){
    this.AllEvents=[];
    this.apiProvider.getReservations()
    .then(data => {
      this.reservations = data;
      for(var i=0;i<this.reservations.length;i++){
        this.Eventdata = {resId: this.reservations[i].resId, title: this.reservations[i].reservationTitle, startTime: this.reservations[i].meetStarts, endTime: this.reservations[i].meetEnds, allDay: this.reservations[i].allDay, room: this.reservations[i].room};
        this.AllEvents.push(this.Eventdata);
      }
    });
    // this.AllEventsFinal=this.AllEvents;
    return this.AllEvents;        
  }
}
