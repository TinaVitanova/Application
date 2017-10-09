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
  isAdmin: boolean;
  CreateUserForm: FormGroup;
  submitAttempt: boolean = false;
  new = {
    fullname:"",
    password:"",
    email:"",
    username:""
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
    this.UserGlobal.SendUserData(this.new.fullname, this.new.username, this.new.email, this.new.password, this.isAdmin);
    let alert = this.alertCtrl.create({
      title: 'You have created the user: ',
      subTitle: 'Fullname: ' + this.new.fullname + 
                '<br>Username: ' + this.new.username + 
                '<br>Email: ' + this.new.email + 
                '<br>Password: ' + this.new.password + 
                '<br>Is admin? '  + this.isAdmin,       
     buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: data => {
          this.submitAttempt = true;
          this.UserGlobal.addNewUser(this.new.username);
          this.UserGlobal.setEmail(this.new.email);
          console.log('Created new user');
        }
      }
     ]
   });
   alert.present();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder) {
    this.CreateUserForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required])],
      fullname: ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      email: ['',Validators.compose([Validators.required,Validators.pattern('[a-z]*\@[a-z]*\.[a-z]*')])],
      password: ['',Validators.compose([Validators.required])],
      isAdmin:[''],
  });
    this.username = navParams.get('param2');
  }

  ionViewDidLoad() {
  }

}
