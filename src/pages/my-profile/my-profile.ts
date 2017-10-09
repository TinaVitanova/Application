import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  
  Username=this.UserGlobal.getMyGlobalVar();
  email=this.UserGlobal.getEmails();
  public todo = {
    newusername:"",
    oldpassword:"",
    newpassword:"",
    newemail:""
  };
  
  
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';


  Change(){
    this.UserGlobal.ChangeUser(this.todo);
  }
 
  logForm(){
    console.log(this.todo)      
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider) {
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
