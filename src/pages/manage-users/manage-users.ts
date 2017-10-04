import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';


@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
})
export class ManageUsersPage {
  users;
  usernames=this.UserGlobal.getUsernames();
  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public alertCtrl: AlertController) {
    this.initializeUsers();
  }

  initializeUsers(){
    this.users=[];
      for (var i=0; i < this.usernames.length; i++){
        this.users.push(this.usernames[i]);
      }
  }
  deleteUser(user){
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Delete the user: '+ user,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.UserGlobal.setDeleteAccName(this.usernames.indexOf(user));
            this.initializeUsers();
          }
        }
      ]
   });
   alert.present();

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
