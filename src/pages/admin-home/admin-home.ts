import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MakeRoomPage } from '../make-room/make-room';
import { ReservePage } from '../reserve/reserve';
import { CalendarPage } from '../calendar/calendar';
import { HomePage } from '../home/home';
/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  makeroom=MakeRoomPage;

  MakeRoomNav(){
    this.navCtrl.push(MakeRoomPage)
  }

  LogoutNav(){
    this.navCtrl.push(HomePage)
  }

  ReserveNav(){
    this.navCtrl.push(ReservePage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

}
