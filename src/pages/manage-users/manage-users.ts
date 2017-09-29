import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';


@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
})
export class ManageUsersPage {
  users;
  username=this.UserGlobal.getMyGlobalVar();

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider) {
    this.initializeUsers();
  }

  initializeUsers(){
    this.users=[
      this.username,//samo toj user shto e momentalno logiran
      'user1',
      'user2',
      'user3',
      'user4',
      'user5',
      'user6',
      'user7'
    ];
  }


  getUsers(ev){
    //reset users back to all of users
    this.initializeUsers();
    
    //set val to the value of the ev target
    var val = ev.target.value;

    //if the value is an empty strign don't filter the items 
    if( val && val.trim() != ''){
      this.users = this.users.filter((user)=>{
        return (user.toLowerCase().indexOf(val.toLowerCase()) > -1);       
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageUsersPage');
  }

}
