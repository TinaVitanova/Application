import { HomePage } from './../pages/home/home';
import { MySchedulePage } from './../pages/my-schedule/my-schedule';
import { MyProfilePage } from './../pages/my-profile/my-profile';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ManageUsersPage } from '../pages/manage-users/manage-users';
import { UsernameGlobalProvider } from '../providers/username-global/username-global';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html',
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  splash = true;
  userImage = "data:image/png;base64," + this.UserGlobal.getUserImage();

  rootPage:any = HomePage;
  pages1: Array<{title: string, component: any}>;
  pages2: Array<{title: string, component: any}>;
 
  constructor(public platform: Platform, public events: Events, public statusBar: StatusBar, public UserGlobal: UsernameGlobalProvider) {
    this.initializeApp();
    events.subscribe('image:added',(image) => {
      this.userImage = "data:image/png;base64," + image;
    })
    // used for an example of ngFor and navigation
    this.pages1 = [
      { title: 'My Profile', component: MyProfilePage },
      { title: 'My Schedule', component: MySchedulePage },
      { title: 'Manage Users', component: ManageUsersPage }
    ];

    this.pages2 = [
      { title: 'My Profile', component: MyProfilePage },
      { title: 'My Schedule', component: MySchedulePage }
    ];
   
  }

  LogOut(){
    this.UserGlobal.setIsLoggedIn(false);
    this.nav.setRoot(HomePage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splash = false;
      }, 4000);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}

