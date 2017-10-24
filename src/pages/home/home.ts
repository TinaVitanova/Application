import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
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
      this.UserGlobal.setIsLoggedIn(true);
      this.UserGlobal.setUserLoggedIn(this.login.username);
        this.navCtrl.setRoot(DashboardPage); 
      }
      else 
        this.flagIncorectLogin = true;
    }
    
    forgotPassword(){
      let myModal = this.modalCtrl.create(ForgotPasswordPage);
      myModal.present();
    }

  constructor(public modalCtrl: ModalController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider, private menuCtrl: MenuController) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required,new Validator(UserGlobal, EventData).isValidUsername])],
      password: ['',Validators.compose([Validators.required,new Validator(UserGlobal, EventData).isValidPassword])],
      
  });
    
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");

  }
  ionViewWillLoad(){
    if(this.UserGlobal.getIsLoggedIn()){
      var username = this.UserGlobal.getUserLoggedIn();
      this.UserGlobal.setMyGlobalVar(username);
      this.navCtrl.setRoot(DashboardPage)
    }
    }
}