import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { Validator } from '../../validators/FormValidator';
import { ApiProvider } from '../../providers/api-provider/api-provider';

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {
  username: string;
  isAdmin: boolean = false;
  CreateUserForm: FormGroup;
  submitAttempt: boolean = false;
  picture;
  new = {
    username:"",
    fullname:"",
    email:"",
    isAdmin:"",
  };

  user = {email:'',userName:''};
  
  
  flagCorrectUsername:boolean=false;
  flagCorrectFullname:boolean=false;
  flagCorrectEmail:boolean=false;
  flagIncorrectUsername:boolean = false;
  flagIncorrectFullname:boolean=false;
  flagIncorrectEmail:boolean = false;
  
  constructor(private apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder, private menuCtrl: MenuController) {
    this.CreateUserForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/^[a-zA-Z][\w.-]*[a-zA-Z0-9]+$/),Validators.required])],
      fullname: ['', Validators.compose([Validators.required,Validators.maxLength(30),Validators.pattern(/[a-zA-Z]+( [a-zA-Z]*)/)])],
      email: ['',Validators.compose([Validators.required,Validators.pattern(/^\w+([\.-]?\ w+)*@\w+([\.-]?\w+)*\.com/)])],
      isAdmin:[''],
  });
    this.username = navParams.get('param2');
  }

  saveUser() {
    this.apiProvider.saveUser(this.user).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  onFocus(){
    if(!this.CreateUserForm.valid){
      if(!this.CreateUserForm.controls.fullname.valid){
        this.flagIncorrectFullname = true;
        this.flagCorrectFullname=false;
    
      }else{
        this.flagIncorrectFullname = false;
        this.flagCorrectFullname=true;
      }
  
      if(!this.CreateUserForm.controls.username.valid){
        this.flagIncorrectUsername = true; 
        this.flagCorrectUsername=false;
      }
      else{
      this.flagIncorrectUsername = false; 
        this.flagCorrectUsername=true;
      }
  
      if(!this.CreateUserForm.controls.email.valid){
        this.flagIncorrectEmail = true;
        this.flagCorrectEmail=false;
    
      }else{
        this.flagIncorrectEmail = false;
        this.flagCorrectEmail=true;
      }
    }
  }

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
    if(this.CreateUserForm.valid){
      this.flagIncorrectFullname = false;
      this.flagIncorrectUsername = false;
      this.flagIncorrectEmail = false;
      
      let alert = this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '<p class="alert-title"><b>USER CREATED:</b><br /></p><hr />',
        subTitle: '<div class="alert-message"><b>FULLNAME:</b> ' + this.new.fullname +
                  '<br><b>USERNAME:</b> ' + this.new.username + 
                  '<br><b>EMAIL:</b> ' + this.new.email 
                  + '</div>',   
       buttons:[
        {
          cssClass: 'alert-btn',
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          cssClass: 'alert-btn',
          text: 'CONFIRM',
          role: 'confirm',
          handler: data => {
            this.submitAttempt = true;
            this.picture = this.UserGlobal.getDefaultImage();
            this.UserGlobal.addNewUser(this.user,this.picture);
            this.saveUser();
            this.resetForm();
          }
        }
       ]
     });
     alert.present();
    }
  }

  resetForm(){
    this.CreateUserForm.reset();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }
}
