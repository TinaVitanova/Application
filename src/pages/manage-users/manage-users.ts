import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';


@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
  
})
export class ManageUsersPage {

  singleArray;
  public AllUsers = this.UserGlobal.getFullUsers();

  imageLoaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public alertCtrl: AlertController) {
    this.initializeUsers();
  }

  initializeUsers(){
    this.singleArray=[];
        for (var _i = 0; _i < this.AllUsers.length; _i++) {
          this.singleArray.push({
                               username: this.AllUsers[_i].username,
                               email: this.AllUsers[_i].email,
                               picture: "data:image/png;base64," + this.AllUsers[_i].picture
                              });                                                        
      }
      
  }

  deleteUser(item){
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Delete the user: '+ item,
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
            this.UserGlobal.setDeleteAccName(this.AllUsers.indexOf(item));
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
      this.singleArray = this.singleArray.filter((item:any) => {
        return (item.username.toLowerCase().indexOf(val1.toLowerCase()) > -1);      
      })
    }
  }

  ionViewDidLoad() {
  }

}
