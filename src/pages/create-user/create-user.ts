import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    password:"",
    isAdmin:"",
  };

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
    let alert = this.alertCtrl.create({
      cssClass: 'alert-style',
      title: '<p class="alert-title"><b>USER CREATED:</b><br /></p><hr />',
      subTitle: '<div class="alert-message"><b>FULLNAME:</b> ' + this.new.fullname + 
                '<br><b>USERNAME:</b> ' + this.new.username + 
                '<br><b>EMAIL:</b> ' + this.new.email + 
                '<br><b>PASSWORD:</b> ' + this.new.password + '</div>',   
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
          this.UserGlobal.addNewUser(this.new,this.picture);
          this.resetForm();
        }
      }
     ]
   });
   alert.present();
  }

  resetForm(){
    this.CreateUserForm.reset();
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder) {
    this.CreateUserForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/^[a-zA-Z][\w.-]*[a-zA-Z0-9]+$/),Validators.required])],
      fullname: ['', Validators.compose([Validators.required,Validators.maxLength(30),Validators.pattern(/[a-zA-Z]+( [a-zA-Z]*)/)])],
      email: ['',Validators.compose([Validators.required,Validators.pattern(/^\w+([\.-]?\ w+)*@\w+([\.-]?\w+)*\.com/)])],
      password: ['',Validators.compose([Validators.required])],
      isAdmin:[''],
  });
    this.username = navParams.get('param2');
  }

  ionViewDidLoad() {
  }

}
