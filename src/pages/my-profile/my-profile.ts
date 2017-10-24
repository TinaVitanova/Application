import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
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
  public todo = {
    newusername:this.UserGlobal.getMyGlobalVar(),
    newpassword:this.UserGlobal.getMyGlobalPass(),
    newemail:this.UserGlobal.getMyGlobalEmail(),
  };

  public imageSrc: String = "data:image/png;base64," + this.UserGlobal.getUserImage();
  base64textString = this.UserGlobal.getUserImage();
  Username=this.UserGlobal.getMyGlobalVar();
  public SubmitAttempt = false;
  ChangeUserForm: FormGroup;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  public showPassword: boolean = false;

  flagCorrectUsername:boolean=false;
  flagCorrectEmail:boolean=false;
  flagCorrectPassword:boolean=false;
  flagIncorrectUsername:boolean = false;
  flagIncorrectEmail:boolean = false;
  flagIncorrectPassword:boolean = false;
  
  onBlur(){
    if(!this.ChangeUserForm.valid){
      if(!this.ChangeUserForm.controls.newusername.valid){
        this.flagIncorrectUsername = true; 
        this.flagCorrectUsername=false;
      }
      else{
      this.flagIncorrectUsername = false; 
        this.flagCorrectUsername=true;
      }
  
      if(!this.ChangeUserForm.controls.newemail.valid){
        this.flagIncorrectEmail = true;
        this.flagCorrectEmail=false;
    
      }else{
        this.flagIncorrectEmail = false;
        this.flagCorrectEmail=true;
      }
  
      if(!this.ChangeUserForm.controls.newpassword.valid){
        this.flagIncorrectPassword = true;
        this.flagCorrectPassword=false;
    
      }else{
        this.flagIncorrectPassword = false;
        this.flagCorrectPassword=true;
      }
    }
  }

  Change(){
    if(this.ChangeUserForm.valid){   
      this.flagIncorrectUsername = false;
      this.flagIncorrectPassword = false;
      this.flagIncorrectEmail = false;

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
          },
          {
            text: 'Change',
            handler: data => {
              this.SubmitAttempt=true;
              if (data.password == "ok") {
                this.events.publish('image:added', this.base64textString);
                this.UserGlobal.ChangeUser(this.todo,this.base64textString);
              }else {
                return false;
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

  constructor(public navCtrl: NavController, public events:Events, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public EventData: EventDataProvider, private menuCtrl: MenuController) {
    this.ChangeUserForm = formBuilder.group({
      newusername: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9]*'),Validators.required, new Validator(UserGlobal, EventData).isNewUsernameValid])],
      newemail: ['',Validators.compose([Validators.pattern('[a-z0-9]+\@[a-z]+\.com'),Validators.required, new Validator(UserGlobal, EventData).isNewEmailValid])],
      newpassword: ['', Validators.compose([Validators.required])],
    });


  }

  ImageLoad() {
    this.imageLoaded = true;
  }

  InputChange(e) {
    
    if(e.target.files.length != 0){
      this.presentLoading();
      var file = e.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();

      if (!file.type.match(pattern)) {
          alert('invalid format'); 
          return;
      }
 
      if (file.size > 7000000){
        alert('max image size 7Mb '); 
        return;
      }

      this.loaded = false;
      //pretvori vo base64 format
      reader.onload = this.ReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  //show/hide password
  togglePassword(input: any): void {
    input.type;
    if(input.type =='password'){
      this.showPassword = true;
      input.type = 'text';
    }else{
      this.showPassword = false;
      input.type = 'password';
    }
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
      duration: 800
    });
    loader.present();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }
}
