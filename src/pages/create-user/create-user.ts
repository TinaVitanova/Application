import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
  //directives: [FileUploaderComponent]
})
export class CreateUserPage {
  username: string;
  isAdmin: boolean;
  new = {
    fullname:"",
    password:"",
    email:"",
    username:""
  };

  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  logFormSignUp(){
    console.log(this.new)
  }

  shouldHide(){
    if(this.username=="superadmin")
    return false;
    else
    return true;
  }

  CreateNewUser(){
    this.UserGlobal.SendUserData(this.new.fullname, this.new.username, this.new.email, this.new.password, this.isAdmin);
    let alert = this.alertCtrl.create({
      title: 'You have created the user: ',
      subTitle: 'Fullname: ' + this.new.fullname + 
                '<br>Username: ' + this.new.username + 
                '<br>Email: ' + this.new.email + 
                '<br>Password: ' + this.new.password + 
                '<br>Is admin? '  + this.isAdmin,       
     buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: data => {
          this.UserGlobal.addNewUser(this.new.username);
          this.UserGlobal.setEmail(this.new.email);
          console.log('Created new user');
        }
      }
     ]
   });
   alert.present();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserGlobal: UsernameGlobalProvider) {
    this.username = navParams.get('param2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }

  handleImageLoad() {
    this.imageLoaded = true;
}

handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
}

_handleReaderLoaded(e) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
}

}
