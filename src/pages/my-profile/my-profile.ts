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
  
  base64textString:any;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: String = '';


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

  ImageLoad() {
    this.imageLoaded = true;
  }

  InputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  
      var pattern = /image-*/;
      var reader = new FileReader();
  
      if (!file.type.match(pattern)) {
          alert('invalid format'); 
          return;
      }
    
      this.loaded = false;
  
  
      //za da go pretvori vo base64 format
      reader.onload = this.ReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  
  
      //ja prikazuva prikachenata slika
      //reader.readAsDataURL(file);
      
  }
 
  ReaderLoaded(e) {
    var reader = e.target;
    var binaryString = e.target.result;
    this.base64textString = btoa(binaryString);
    this.imageSrc = "data:image/png;base64," + this.base64textString;
    this.UserGlobal.setUserImage(this.base64textString);
    this.loaded = true;  
  }

}
