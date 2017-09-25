import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { ManageUsersPage } from '../pages/manage-users/manage-users';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  MyProfileNav(Page){
    this.nav.push(MyProfilePage);
  }
  MyScheduleNav(Page){
    this.nav.push(MySchedulePage);
  }
  ManageUsersNav(Page){
    this.nav.push(ManageUsersPage);
  }
  HomePageNav(Page){
    this.nav.setRoot(LoginPage);
  }
  LogoutNav(Page){
    this.nav.setRoot(HomePage);
  }
  shouldHide(){
    
  }



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
 
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

