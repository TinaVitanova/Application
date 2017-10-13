import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { Validator } from '../../validators/FormValidator';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  
  Username=this.UserGlobal.getMyGlobalVar();
  public todo = {
    newusername:this.UserGlobal.getMyGlobalVar(),
    newpassword:this.UserGlobal.getMyGlobalPass(),
    newemail:this.UserGlobal.getMyGlobalEmail() 
  };
  ChangeUserForm: FormGroup;
  base64textString:any;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: String = '';


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
              this.UserGlobal.ChangeUser(this.todo,this.base64textString);
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
    //console.log(this.todo)      
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public EventData: EventDataProvider) {
    this.ChangeUserForm = formBuilder.group({
      newusername: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'), new Validator(UserGlobal, EventData).isNewUsernameValid,Validators.required])],
      newemail: ['',Validators.compose([Validators.pattern('[a-z]+\@[a-z]+\.[a-z]+'), new Validator(UserGlobal, EventData).isEmailValid,Validators.required])],
      newpassword: ['', Validators.compose([Validators.required])],
  });
  }

  ionViewDidLoad() {
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
