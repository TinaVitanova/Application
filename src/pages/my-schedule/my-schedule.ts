import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodayPage } from '../my-schedule/days/today/today';
import { TomorrowPage } from '../my-schedule/days/tomorrow/tomorrow';
import { NextDaysPage } from '../my-schedule/days/next-days/next-days';

@IonicPage()
@Component({
  selector: 'page-my-schedule',
  templateUrl: 'my-schedule.html',
})
export class MySchedulePage {
  Today = TodayPage;
  Tomorrow = TomorrowPage;
  NextDays = NextDaysPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MySchedulePage');
  }

}
