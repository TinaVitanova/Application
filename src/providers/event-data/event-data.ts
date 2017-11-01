import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api-provider/api-provider';

@Injectable()
export class EventDataProvider {
  public flag;
  public RoomsData: {roomId:number, roomName: string, capacity: string, descript: string};
  // public RoomsDataFinal: {name: string, capacity: string, description: string};
  public Eventdata: {resId: number, title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object, user: Object};
  // public EventdataFinal: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object};
  public AllEvents: any;
  // public AllEventsFinal: {title: string, startTime: Date, endTime: Date, allDay: boolean, room: Object}[]=[];
  public FullRooms:any;
  // public FullRoomsFinal: {name: string, capacity: string, description: string}[]=[];
  public loadEvent;
  public IsChangeEvent=false;
  public IndexOfchangeEvent;
  public changeEvent;
  public FlagStartEndTime;
  reservations;
  rooms;
  constructor(public storage: Storage, public apiProvider: ApiProvider) {
    this.getRooms();
  } 
  public checkRoomName(value){
    for (var i=0; i<this.FullRooms.length; i++){
      if (this.FullRooms[i].roomName == value)
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
      for(var i=0;i<this.rooms.length;i++){
        let room = this.rooms[i].room;
        this.RoomsData = {roomId:room.roomId, roomName: room.roomName, capacity: room.capacity, descript: room.description};
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
  public deleteRoom(room){
    this.apiProvider.deleteRoom(room.roomId)
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
        this.Eventdata = {resId: this.reservations[i].resId, title: this.reservations[i].reservationTitle, startTime: this.reservations[i].meetStarts, endTime: this.reservations[i].meetEnds, allDay: this.reservations[i].allDay, room: this.reservations[i].room, user: this.reservations[i].user};
        this.AllEvents.push(this.Eventdata);
      }
    });
    // this.AllEventsFinal=this.AllEvents;
    return this.AllEvents;        
  }
}
