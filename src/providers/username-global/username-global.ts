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
  public UsersData: {fullname: string, username: string, email: string, password: string , isAdmin: boolean};
  public FullUsers = {};

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
  public addNewUsername(value) {
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
 
  public SendUserData(value:string, value1:string, value2: string, value3: string, value4: boolean){
    this.UsersData = {fullname: value, username: value1, email: value2, password: value3, isAdmin: value4}
    console.log('u provider: '+ this.UsersData.fullname + ' '+ this.UsersData.username + ' '+ this.UsersData.email + ' '+ this.UsersData.password + ' '+ this.UsersData.isAdmin);
    this.FullUsers = this.UsersData;
    console.log('ja sum eden user: '+ this.FullUsers)
  }

}