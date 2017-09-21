import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { AdminHomePage } from '../admin-home/admin-home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    login = LoginPage;
    signUp = SignupPage;
    adminhome = AdminHomePage;

    todo = {
      username:"",
      password:""
    };

    logForm(){
      console.log(this.todo)
    }
    
    SignupNav(){
      this.navCtrl.push(SignupPage)
    }

    LoginNav(){
      /**Bla bla check dali user postoi
       * Bla check dali user.pass=pass
       * Bla check dali admin or no and route accordingly
       */
      if (this.todo.username=='admin')
      this.navCtrl.push(AdminHomePage)
      else if (this.todo.username=='test')
      this.navCtrl.push(LoginPage)
      
    }

  constructor(public navCtrl: NavController) {
   
   
  }

}
