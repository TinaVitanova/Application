import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsernameGlobalProvider {
  public Usernames = ['test','admin','superadmin'];
  public Fullnames = ['Test 1', 'Admin 1', 'Superadmin 1'];
  public Emails = ['test@test.com', 'admin@admin.com','superadmin@superadmin.com'];
  public Passwords = ['pass', 'pass', 'pass'];
  public IsAdmin = [false,true,true];
  public userIndex:any;

  public CurrentUser;
  public UsersData: {username: string, fullname: string, email: string, password: string, isAdmin: boolean};
  public FullUsers:{username: string, fullname: string, email: string, password: string, isAdmin: boolean}[]= [];
  public CurrentUserIndex;

  constructor(public storage: Storage) {
    console.log('pochetok?')
    for (var i=0; i<3; i++){
    this.UsersData = {username: this.Usernames[i], fullname: this.Fullnames[i], email: this.Emails[i], password: this.Passwords[i], isAdmin: this.IsAdmin[i]};
    this.FullUsers.push(this.UsersData);
    }
  }


  public userImage;
  public imgSrc;
  public flagUserImage = false;



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
    for (var i=0; i<this.FullUsers.length; i++){
    if (this.FullUsers[i].username==value)
      this.userIndex = i;
    }
    this.CurrentUserIndex=this.userIndex;
    this.CurrentUser=this.FullUsers[this.CurrentUserIndex].username;
  }

  public setEmail(value){
    this.FullUsers[this.CurrentUserIndex].email = value;

  }

  public setDeleteAccName(value){

    this.FullUsers.splice(value,1);
  }

  public addNewUser(value) {
    this.FullUsers.push(value);
  }
  
  public ChangeUser(value){
    this.FullUsers[this.CurrentUserIndex].username = value.newusername;
    this.FullUsers[this.CurrentUserIndex].password = value.newpassword;
    this.FullUsers[this.CurrentUserIndex].email = value.newemail;
    this.CurrentUser=this.FullUsers[this.CurrentUserIndex].username;
  }

  public getEmail(){
    return this.FullUsers[this.CurrentUserIndex].email;

  }

  public getUsernames(){
    for (var i=0; i<this.FullUsers.length; i++)
    this.Usernames[i] = this.FullUsers[i].username;
    return this.Usernames;
  }

  public getMyGlobalVar() {
      return this.FullUsers[this.CurrentUserIndex].username;
  }


  /*
  public SendUserData(value:string, value1:string, value2: string, value3: string, value4: boolean){
    this.UsersData = {fullname: value, username: value1, email: value2, password: value3, isAdmin: value4}
    this.FullUsers = this.UsersData;
  }
*/

  checkUsername(value){
    for (var i=0; i<this.FullUsers.length; i++){
      if (value == this.FullUsers[i].username){
       return true
      }
      }
      return false

  }

  checkPassword(value){
    
  }
}