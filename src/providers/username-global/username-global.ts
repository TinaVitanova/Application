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
  public userIndex:any;
  public user;
  public Email;

  constructor(public storage: Storage) {
    console.log('Hello UsernameGlobal Provider');
  }
  public setMyGlobalVar(value:any) {
    this.userIndex = this.Usernames.indexOf(value);
    this.user=this.Usernames[this.userIndex];
  }
  public setEmail(value){
    this.Email=value;
  }
  public setDeleteAccName(value){
    this.Usernames.splice(value,1);
    console.log('setDeleteAccName e povikana i ova mi e usernames: '+ this.Usernames)
  }
  public addNewUser(value) {
    this.Usernames.push(value);
  }
  public ChangeUser(value){
    this.Usernames[this.userIndex]=value.newusername;
    this.user=this.Usernames[this.userIndex];
    console.log('u usernameglobal ova value so e: '+ value +' i ako pristapam do .neso: '+ value.newusername);
  }
  public getEmail(){
    return this.Email;
  }
  public getUsernames(){
    return this.Usernames;
  }
  public getMyGlobalVar() {
      return this.user;
  }

}