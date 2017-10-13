import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';


@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
  
})
export class ManageUsersPage {
  username;
  email;
  picture;
  singleArray;
  userImage = this.UserGlobal.getUserImage();
  usernames=this.UserGlobal.getUsernames(); 
  emails=this.UserGlobal.getEmails();

  imageLoaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public alertCtrl: AlertController) {
    this.initializeUsers();
  }

  initializeUsers(){
    this.username=[];
    this.email=[];
    this.picture=[];
    this.singleArray=[];
        for (var _i = 0; _i < this.usernames.length; _i++) {
          this.singleArray.push({
                               username: this.usernames[_i],
                               email: this.emails[_i],
                               picture: "data:image/png;base64," + this.userImage
                              });
                                                            
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

  ImageLoad() {
    this.imageLoaded = true;
  }

  getUsers(ev){
    //reset users back to all of users
    this.initializeUsers();
    //set val to the value of the ev target
    var val1 = ev.target.value;

    //if the value is an empty string don't filter the items 
    if( val1 && val1.trim() != ''){
      this.username = this.username.filter((user)=>{
        return (user.toLowerCase().indexOf(val1.toLowerCase()) > -1);       
      })
    }
  }

  ionViewDidLoad() {
  }

}
