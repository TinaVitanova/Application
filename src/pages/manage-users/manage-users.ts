import { ApiProvider } from '../../providers/api-provider/api-provider';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';


@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
  
})
export class ManageUsersPage {

  singleArray;
  public AllUsers = this.UserGlobal.getFullUsers();

  imageLoaded: boolean = false;
  users:{email:'',userName:''}[]=[];
  

  getUser() {
    this.apiProvider.getUser()
    .then(data => {
      this.users = data;
    });
  }

  constructor(private apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public alertCtrl: AlertController, public menuCtrl: MenuController) {
    
    //this.getUser();
  }

  initializeUsers(){
    this.singleArray=[];
        for (var _i = 0; _i < this.AllUsers.length; _i++) {
          this.singleArray.push({
                               username: this.AllUsers[_i].userName,
                               email: this.AllUsers[_i].email,
                               //picture: "data:image/png;base64," + this.AllUsers[_i].picture
                              });                                                        
      }
      
  }
  
  deleteUser(item){
    let alert = this.alertCtrl.create({
      cssClass: 'alert-style',
      title: '<p class="alert-title"><b>DELETE USER:</b><br /></p><hr />',
      message: '<div class="alert-message"><b>Are you sure you want to delete this user:</b> ' + item.username,
      buttons: [
        {
          text: 'CANCEL',
          cssClass: 'alert-btn',
          role: 'cancel',
        },
        {
          text: 'DELETE',
          cssClass: 'alert-btn',
          handler: () => {
            console.log(this.singleArray.indexOf(item))
            console.log(this.AllUsers[this.singleArray.indexOf(item)].userId)
           //let index = this.AllUsers[this.singleArray.indexOf(item)];
            this.UserGlobal.setDeleteAccName(this.AllUsers[this.singleArray.indexOf(item)].userId);
            this.AllUsers.splice(this.singleArray.indexOf(item), 1);
            this.initializeUsers();
            //valjda treba getUser() 
          }
        }
      ]
   });
   alert.present();

  }

  ImageLoad() {
    this.imageLoaded = true;
  }

  searchUsers(ev){
    //reset users back to all of users
    this.initializeUsers();
    //this.getUser();
    //set val to the value of the ev target
    var val1 = ev.target.value;

    //if the value is an empty string don't filter the items 
    if( val1 && val1.trim() != ''){
      this.singleArray = this.singleArray.filter((item:any) => {
        return (item.username.toLowerCase().indexOf(val1.toLowerCase()) > -1);      
      })
    }
  }

  ionViewDidEnter(){
    //this.getUser();
    this.initializeUsers();
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }

}
