import { MySchedulePage } from './../pages/my-schedule/my-schedule';
import { MyProfilePage } from './../pages/my-profile/my-profile';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ManageUsersPage } from '../pages/manage-users/manage-users';
import { UsernameGlobalProvider } from '../providers/username-global/username-global';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  name:any=this.UserGlobal.getMyGlobalVar();
  pages: Array<{title: string, component: any}>;

  shouldHide(){
    if(this.name=="superadmin" || this.name=="admin")
    return false;
    else
    return true;
  }
 
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public UserGlobal: UsernameGlobalProvider) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: LoginPage },
      { title: 'My Profile', component: MyProfilePage },
      { title: 'My Schedule', component: MySchedulePage },
      { title: 'Manage Users', component: ManageUsersPage },
      { title: 'Logout', component: HomePage }
    ];
 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}

