import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validator } from '../../validators/FormValidator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    loginForm: FormGroup;
    UsernamesList = [];
    flagIncorectLogin = false;
    submitAttempt: boolean = false;

    message:string="";

    public login = {
      username:"",
      password:"",
    };

    LoginNav(){
      this.submitAttempt = true;
      this.UsernamesList = this.UserGlobal.getUsernames();
      if (this.loginForm.valid){
      this.UserGlobal.setMyGlobalVar(this.login.username);
        this.navCtrl.setRoot(DashboardPage);  
      }
      else 
        this.flagIncorectLogin = true;
    }
    
    forgotPassword(){
      let alert = this.alertCtrl.create({
        title: 'RESET PASSWORD',
        subTitle: 'Please enter your email address and we will send you an email to reset your password.',
        inputs: [
          {
            name: 'Email',
            placeholder: 'Email',
            type: 'email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Reset',
            handler: data => {
              var pattern = /^\w+([\.-]?\ w+)*@\w+([\.-]?\w+)*\.com/;
              
              if(data.Email != ""){
                if(data.Email.match(pattern)){    
                  console.log("ovoj email go vnesuvam vo forgot " + data.Email); 
                  this.message = '';
                  //send to backend
                  return true;
                }else{
                  console.log("grshen pattern na email");
                  this.message = 'Invalid email!';
                  return false;
                }
              }else{
                console.log("nema niso vneseno")
                return false;
              }
            }
          }
        ],
        message:this.message
      });
      alert.present();
    }

  constructor(public formBuilder: FormBuilder,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider, private menuCtrl: MenuController) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required,new Validator(UserGlobal, EventData).isValidUsername])],
      password: ['',Validators.compose([Validators.required,new Validator(UserGlobal, EventData).isValidPassword])],
      
  });
    
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");

  }
}