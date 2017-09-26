import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsernameGlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsernameGlobalProvider {

  public myUsername:any;
  public user:any;
  public amanvishe:any="aaaaaaaaaa";
  constructor(public storage: Storage) {
    console.log('Hello UsernameGlobal Provider');
  }
  public setMyGlobalVar(value:any) {
    this.storage.set(this.myUsername,value);
    this.user = value;
  }
  public getMyGlobalVar() {
      return this.user;
  }
  public random(){
    return this.amanvishe;
  }



}