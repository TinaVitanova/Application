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
  public email;
  public Emails = ['1', '2', '3'];
  public UsersData: {fullname: string, username: string, email: string, password: string , isAdmin: boolean};
  public FullUsers = {};
  public userImage;
  public imgSrc;
  public flagUserImage = false;

  constructor(public storage: Storage) {
  }

  public setUserImage(value){
    this.userImage = value;
    this.flagUserImage=true;
  }
  public getFlagUserimage(){
    return this.flagUserImage;
  }

  public getUserImage(){
    return this.userImage;
  }

  public setMyGlobalVar(value:any) {
    this.userIndex = this.Usernames.indexOf(value);
    this.user=this.Usernames[this.userIndex];
  }
  public setEmail(value){
    this.Emails.push(value);
  }
  public setDeleteAccName(value){
    this.Usernames.splice(value,1);
  }
  public addNewUsername(value) {
    this.Usernames.push(value);
  }
  public ChangeUser(value){
    this.Usernames[this.userIndex]=value.newusername;
    this.user=this.Usernames[this.userIndex];
  }

  public ChangeEmail(value){
    this.Emails[this.userIndex]=value.newemail;
    this.email = this.Emails[this.userIndex];
  }

  public getEmails(){
    return this.Emails;
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

}