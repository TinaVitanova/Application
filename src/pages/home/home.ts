import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validator } from '../../validators/FormValidator';
import { ApiProvider } from '../../providers/api-provider/api-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  loginForm: FormGroup;
  UsernamesList = [];
  submitAttempt: boolean = false;
  flagIncorrectUsername:boolean = false;
  flagIncorrectPassword:boolean = false;
  message:string="";
  public showPassword: boolean = false;
  

  public login = {
    username:"",
    password:"",
  };

  constructor(private apiProvider: ApiProvider, public modalCtrl: ModalController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider, private menuCtrl: MenuController) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9]*'),Validators.required,new Validator(UserGlobal, EventData).isValidUsername])],
      password: ['',Validators.compose([Validators.required,new Validator(UserGlobal, EventData).isValidPassword])],
      
    });
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }


  LoginNav(){
    this.submitAttempt = true;
    this.UsernamesList = this.UserGlobal.getUsernames();
    if (this.loginForm.valid){
    this.flagIncorrectUsername = false;
    this.flagIncorrectPassword = false;
    this.UserGlobal.setMyGlobalVar(this.login.username);
    this.UserGlobal.setIsLoggedIn(true);
    this.UserGlobal.setUserLoggedIn(this.login.username);
      this.navCtrl.setRoot(DashboardPage); 
    }
  }
    
  forgotPassword(){
    let myModal = this.modalCtrl.create(ForgotPasswordPage);
    myModal.present();
  }

  ionViewWillLoad(){
    if(this.UserGlobal.getIsLoggedIn()){
      var username = this.UserGlobal.getUserLoggedIn();
      this.UserGlobal.setMyGlobalVar(username);
      this.navCtrl.setRoot(DashboardPage)
    }
    
  }

  onBlurUsername(){
    if(!this.login.username){
      this.flagIncorrectUsername = false; 
    }
    else{
      if(!this.loginForm.valid){
        if(!this.loginForm.controls.username.valid){
          this.flagIncorrectUsername = true; 
        }
        else{
        this.flagIncorrectUsername = false; 
        }
      }
    }
  }
  onBlurPassword(){
    if(!this.login.password){
      this.flagIncorrectPassword=false;
    }
    else{
      if(!this.loginForm.valid){
        if(!this.loginForm.controls.password.valid){
          this.flagIncorrectPassword = true; 
        }else{
          this.flagIncorrectPassword = false;
        }
      }
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
}