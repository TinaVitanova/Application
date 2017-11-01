import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api-provider/api-provider';

@Injectable()
export class UsernameGlobalProvider {
  public Usernames = [];
  public Emails = [];
  public Passwords = [];
  public log = [];
  public role = [];
  public userIndex:any;
  public CurrentUser;
  public IsLoggedIn;
  public UserLoggedIn;
  public UsersData: {userId:number, email:string,userName:string,password:string,log:boolean,role:number};
  public FullUsers:{userId:number, email:string,userName:string,password:string,log:boolean,role:number}[]= [];
  public CurrentUserIndex = 0;
  
  newuser: {userId:number, email:string,userName:string,password:string}


  users;


  constructor(public storage: Storage, private apiProvider: ApiProvider) {
    this.getFullUsers();
  }

  public setIsLoggedIn(value){
    this.storage.set("IsLoggedIn",value);
    console.log(this.storage);
  }
  public setUserLoggedIn(value){
    this.storage.set("UserLoggedIn",value);
    console.log(this.storage);
  }
  public getUserLoggedIn(){
    this.storage.get("UserLoggedIn").then((value) =>{
      return value
    })
  }
  public getIsLoggedIn(){
    this.storage.get("IsLoggedIn").then((value) =>{
      return value
    })
  }

  public setMyGlobalVar(value:any) {
    for (var i=0; i<this.FullUsers.length; i++){
    if (this.FullUsers[i].userName==value)
      this.userIndex = i;
    }
    this.CurrentUserIndex=this.userIndex;
    this.CurrentUser=this.FullUsers[this.CurrentUserIndex].userName;
  }
  
  // public getUserImage(){
  //   return this.FullUsers[this.CurrentUserIndex].picture;
  // }


  public setEmail(value){
    this.FullUsers[this.CurrentUserIndex].email = value;

  }

  public setDeleteAccName(value){
    this.apiProvider.deleteUser(value);
    this.FullUsers.splice(value,1);
  }

  public addNewUser(value) {
   this.UsersData = {userId: value.userId, email: value.email, userName: value.userName, password: value.password, log: value.log, role: value.role};
   this.FullUsers.push(this.UsersData);
  }
  
  public ChangeUser(value){
    this.FullUsers[this.CurrentUserIndex].userId = value.userId;
    this.FullUsers[this.CurrentUserIndex].userName = value.newusername;
    this.FullUsers[this.CurrentUserIndex].password = value.newpassword;
    this.FullUsers[this.CurrentUserIndex].email = value.newemail;
    this.newuser = {userId: value.userId,userName: value.newusername, email: value.newemail, password: value.newpassword};
    this.CurrentUser=this.FullUsers[this.CurrentUserIndex].userName;
    
    this.apiProvider.editUser(this.newuser);
  }

  public getFullUsers(){
    this.FullUsers = [];
    this.apiProvider.getUser()
    .then(data => {
      this.users = data;
      for (var i=0; i<this.users.length; i++){
        this.UsersData = {userId: this.users[i].userId, email: this.users[i].email, userName: this.users[i].userName, password: this.users[i].password, log: this.users[i].log, role: this.users[i].role};
        this.FullUsers.push(this.UsersData);
      }
    });
    return this.FullUsers;
  }

  public getMyGlobalId(){
    return this.FullUsers[this.CurrentUserIndex].userId;
  }

  public getEmail(){
    return this.FullUsers[this.CurrentUserIndex].email;
  }

  public getUsernames(){
    for (var i=0; i<this.FullUsers.length; i++)
    this.Usernames[i] = this.FullUsers[i].userName;
    return this.Usernames;
  }

  public getMyGlobalVar() {
      return this.FullUsers[this.CurrentUserIndex].userName;
  }

  public getMyGlobalRole() {
    return this.FullUsers[this.CurrentUserIndex].role;
}
  
  public getMyGlobalPass() {
    return this.FullUsers[this.CurrentUserIndex].password;
}
public getMyGlobalEmail() {
  return this.FullUsers[this.CurrentUserIndex].email;
}
  /*
  public SendUserData(value:string, value1:string, value2: string, value3: string, value4: boolean){
    this.UsersData = {fullname: value, username: value1, email: value2, password: value3, isAdmin: value4}
    this.FullUsers = this.UsersData;
  }
*/

  checkUsername(value){
    for (var i=0; i<this.FullUsers.length; i++){
      if (value == this.FullUsers[i].userName){
       return true
      }
      }
      return false

  }
  checkEmail(value){
    for (var i=0; i<this.FullUsers.length; i++){
      if (value == this.FullUsers[i].email){
       return true
      }
      }
      return false

  }

  checkPassword(value){
    return true;
  }


  public defaultImage ="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";
  getDefaultImage(){
    return this.defaultImage;
  }
}