import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  
  Username=this.UserGlobal.getMyGlobalVar();
  email=this.UserGlobal.getEmail();
  public todo = {
    newusername:"",
    newpassword:"",
    newemail:""
  };
  
  
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';


  Change(){
    let alert = this.alertCtrl.create({
      title: 'Change',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: data => {
            if (data.password == "ok") {
              console.log('yup')
              this.UserGlobal.ChangeUser(this.todo);
            } else {
              console.log('nope')
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
 
  logForm(){
    console.log(this.todo)      
  }
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
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
