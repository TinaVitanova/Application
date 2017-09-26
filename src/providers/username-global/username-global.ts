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
  public dacrknete:any='pls work';
  constructor(public storage: Storage) {
    if(this.myUsername=="test")
    console.log('raboti set metoda');
    console.log('Hello UsernameGlobal Provider');
  }
  public setMyGlobalVar(value:any) {
    this.storage.set(this.myUsername,value);
    console.log('povikana set metoda ' +value);
  }
  public getMyGlobalVar() {
    this.storage.get(this.myUsername).then((value) =>{
      console.log('povikana get metoda '+value);
      return value;
    })
  }
  public Proba12() {
    return this.dacrknete;
  }
}