import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../validators/FormValidator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    loginForm: FormGroup;
    UsernamesList = [];
    flagUser;
    submitAttempt: boolean = false;
    public login = {
      username:"",
      password:"",
    };

    ionViewDidLoad(){
      
    }

    logForm(){
      console.log(this.login)      
    }
    
    LoginNav(){
      this.submitAttempt = true;
      this.UsernamesList = this.UserGlobal.getUsernames();
      this.UserGlobal.setMyGlobalVar(this.login.username);
      this.flagUser = this.UsernamesList.indexOf(this.login.username);
      if ( this.flagUser != -1 ){
      this.navCtrl.setRoot(DashboardPage);  
      }
    }
    forgotPassword(){
      
    }

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern('[a-zA-Z]*'),Validators.required]), Validator.isValidUsername],
      password: ['',Validators.compose([Validators.required])],
  });
    
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");

  }

}