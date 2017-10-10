import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsernameGlobalProvider {
  public Usernames = ['test','admin','superadmin'];
  public userIndex:any;
  public user;
  public Email;
  public UsersData: {fullname: string, username: string, email: string, password: string , isAdmin: boolean};
  public FullUsers = {};

  constructor(public storage: Storage) {
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
  }

  public addNewUser(value) {
    this.Usernames.push(value);
  }
  
  public ChangeUser(value){
    this.Usernames[this.userIndex]=value.newusername;
    this.user=this.Usernames[this.userIndex];
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

  public SendUserData(value:string, value1:string, value2: string, value3: string, value4: boolean){
    this.UsersData = {fullname: value, username: value1, email: value2, password: value3, isAdmin: value4}
    this.FullUsers = this.UsersData;
  }

  checkUsername(value){
    for (var i=0; i<this.Usernames.length; i++){
      if (value == this.Usernames[i]){
       return true
      }
      }
      return false
  }

  checkPassword(value){
    
  }
}