import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AdminHomePage } from '../admin-home/admin-home';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    login = LoginPage;
    adminhome = AdminHomePage;

    public todo = {
      username:"",
      password:""
    };

   
    logForm(){
      console.log(this.todo)      
    }

    LoginNav(){
      if (this.todo.username=='admin')
      this.navCtrl.push(AdminHomePage, {param1: this.todo.username})
      if (this.todo.username=='superadmin')
      this.navCtrl.push(AdminHomePage, {param1: this.todo.username})
      else if (this.todo.username=='test')
      this.navCtrl.push(LoginPage, {param1: this.todo.username})     
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

}