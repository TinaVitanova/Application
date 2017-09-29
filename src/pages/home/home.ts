import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    splash = true;
    login = LoginPage;
  

    public todo = {
      username:"",
      password:"",
    };

    // splash screen onload func
    ionViewDidLoad(){
      setTimeout(() => {
        this.splash = false;
      }, 4000);
    }
    // splash screen end

    logForm(){
      console.log(this.todo)      
    }

    LoginNav(){
      this.UserGlobal.setMyGlobalVar(this.todo.username);
      if (this.todo.username=='test' || this.todo.username=='superadmin'|| this.todo.username=='admin'){
      this.navCtrl.setRoot(LoginPage);  
      }
    }

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
  }

}