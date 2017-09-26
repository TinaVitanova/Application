import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';
import { CalendarPage } from '../calendar/calendar';
import { Storage } from '@ionic/storage';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  reservepage=ReservePage;
  calendarpage=CalendarPage;
  username=this.UserGlobal.getMyGlobalVar();
  ReserveNav(){
    this.navCtrl.push(ReservePage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  LogoutNav(){
    this.navCtrl.pop()
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public UserGlobal: UsernameGlobalProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.UserGlobal.getMyGlobalVar());
    console.log(this.UserGlobal.Proba12());
  }

}
