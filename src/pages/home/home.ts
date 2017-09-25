import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { AdminHomePage } from '../admin-home/admin-home';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    //splash screen var
    splash = true;
    // splash screen end
    login = LoginPage;
    signUp = SignupPage;
    adminhome = AdminHomePage;

    public todo = {
      username:"",
      password:""
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
    
    SignupNav(){
      this.navCtrl.push(SignupPage)
    }
    
    LoginNav(){
      /**Bla bla check dali user postoi
       * Bla check dali user.pass=pass
       * Bla check dali admin or no and route accordingly
       */
      if (this.todo.username=='admin')
      this.navCtrl.push(AdminHomePage, {param1: this.todo.username})
      else if (this.todo.username=='test')
      this.navCtrl.push(LoginPage, {param1: this.todo.username})
      
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

}