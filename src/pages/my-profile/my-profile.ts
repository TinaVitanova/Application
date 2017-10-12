import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  ImageLoad() {
    this.imageLoaded = true;
    
    
  }

  InputChange(e) {
    this.presentLoading();
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      
      
       
      var pattern = /image-*/;
      var reader = new FileReader();
  
      //proveruva dali e prikachena slika
      if (!file.type.match(pattern)) {
          alert('invalid format'); 
          return;
      }
      
      //proveruva golemina na slika 
      if (file.size > 500000){
        alert('max image size 500kb '); 
        return;
      }

      this.loaded = false;
      //pretvori vo base64 format
      reader.onload = this.ReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
 
  ReaderLoaded(e) {
    var binaryString = e.target.result;
    this.base64textString = btoa(binaryString);
    this.imageSrc = "data:image/png;base64," + this.base64textString;
    this.UserGlobal.setUserImage(this.base64textString);
    this.loaded = true;  
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1200
    });
    loader.present();
  }
}
