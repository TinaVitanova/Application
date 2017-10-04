import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    UsernamesList = [];
    flagUser;
    public todo = {
      username:"",
      password:"",
    };

    ionViewDidLoad(){
    }

    logForm(){
      console.log(this.todo)      
    }

    LoginNav(){
      
      this.UsernamesList = this.UserGlobal.getUsernames();
      this.UserGlobal.setMyGlobalVar(this.todo.username);
      this.flagUser = this.UsernamesList.indexOf(this.todo.username);
      console.log('UsernamesList: ' + this.UsernamesList + 'za dali ja dobiva vrednosta: ' + this.flagUser)
      if ( this.flagUser != -1 ){
      this.navCtrl.setRoot(LoginPage);  
      }
    }


  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");

  }

}