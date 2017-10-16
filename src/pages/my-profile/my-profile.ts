import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { Validator } from '../../validators/FormValidator';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  public SubmitAttempt = false;
  Username=this.UserGlobal.getMyGlobalVar();
  public todo = {
    newusername:this.UserGlobal.getMyGlobalVar(),
    newpassword:this.UserGlobal.getMyGlobalPass(),
    newemail:this.UserGlobal.getMyGlobalEmail(),
  };

  //public newpicture = this.UserGlobal.getUserImage();
  ChangeUserForm: FormGroup;
  base64textString = this.UserGlobal.getUserImage();
  loaded: boolean = false;
  imageLoaded: boolean = false;
  public imageSrc: String = "data:image/png;base64," + this.UserGlobal.getUserImage();


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
            this.SubmitAttempt=true;
            if (data.password == "ok") {
              console.log('yup')
              this.events.publish('image:added', this.base64textString);
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

  constructor(public navCtrl: NavController, public events:Events, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public EventData: EventDataProvider) {
    this.ChangeUserForm = formBuilder.group({
      newusername: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9]*'),Validators.required, new Validator(UserGlobal, EventData).isNewUsernameValid])],
      newemail: ['',Validators.compose([Validators.pattern('[a-z0-9]+\@[a-z]+\.com'),Validators.required, new Validator(UserGlobal, EventData).isNewEmailValid])],
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
      if (file.size > 7000000){
        alert('max image size 7Mb '); 
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
