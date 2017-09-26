import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AdminHomePage } from '../admin-home/admin-home';
import { NavParams } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    //splash screen var
    splash = true;
    // splash screen end
    login = LoginPage;
    adminhome = AdminHomePage;

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
      if (this.todo.username=='admin')
      this.navCtrl.push(AdminHomePage, {param1: this.todo.username})
      if (this.todo.username=='superadmin')
      this.navCtrl.push(AdminHomePage, {param1: this.todo.username})
      else if (this.todo.username=='test')
      this.navCtrl.push(LoginPage, {param1: this.todo.username})     
    }

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider) {

  }

}