import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgCalendarModule } from 'ionic2-calendar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ReservePage } from '../pages/reserve/reserve';
import { CalendarPage } from '../pages/calendar/calendar';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import { MakeRoomPage } from '../pages/make-room/make-room';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { ManageUsersPage } from '../pages/manage-users/manage-users';
import { UsernameGlobalProvider } from '../providers/username-global/username-global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    ReservePage,
    CalendarPage,
    AdminHomePage,
    MakeRoomPage,
    MyProfilePage,
    MySchedulePage,
    ManageUsersPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    ReservePage,
    CalendarPage,
    AdminHomePage,
    MakeRoomPage,
    MyProfilePage,
    MySchedulePage,
    ManageUsersPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsernameGlobalProvider
  ]
})
export class AppModule {}
