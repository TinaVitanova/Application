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
      title: 'You have created the user: ',
      subTitle: 'Fullname: ' + this.new.fullname + 
                '<br>Username: ' + this.new.username + 
                '<br>Email: ' + this.new.email + 
                '<br>Password: ' + this.new.password,   
     buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
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
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9_.-]*'),Validators.required])],
      fullname: ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      email: ['',Validators.compose([Validators.required,Validators.pattern('[a-z0-9_.-]+\@[a-z]+\.com')])],
      password: ['',Validators.compose([Validators.required])],
      isAdmin:[''],
  });
    this.username = navParams.get('param2');
  }

  ionViewDidLoad() {
  }

}
