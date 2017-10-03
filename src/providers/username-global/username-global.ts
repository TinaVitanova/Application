import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsernameGlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsernameGlobalProvider {
  public Usernames = ['test','admin','superadmin'];
  public myUsername:any;
  public user:any;
  constructor(public storage: Storage) {
    console.log('Hello UsernameGlobal Provider');
  }
  public setMyGlobalVar(value:any) {
    this.storage.set(this.myUsername,value);
    this.user = value;
  }
  public setDeleteAccName(value){
    this.Usernames.splice(value,1);
    console.log('setDeleteAccName e povikana i ova mi e usernames: '+ this.Usernames)
  }
  public addNewUser(value) {
    this.Usernames.push(value);
  }
  public getUsernames(){
    return this.Usernames;
  }
  public getMyGlobalVar() {
      return this.user;
  }

}