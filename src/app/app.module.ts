import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgCalendarModule } from 'ionic2-calendar';
import { IonicStorageModule } from '@ionic/storage';


import { TodayPage } from '../pages/my-schedule/days/today/today';
import { TomorrowPage } from '../pages/my-schedule/days/tomorrow/tomorrow';
import { NextDaysPage } from '../pages/my-schedule/days/next-days/next-days';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { MakeRoomPage } from '../pages/make-room/make-room';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { ManageUsersPage } from '../pages/manage-users/manage-users';
import { UsernameGlobalProvider } from '../providers/username-global/username-global';
import { EventDataProvider } from '../providers/event-data/event-data';
import { ReserveEventPage } from '../pages/reserve-event/reserve-event';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    CalendarPage,
    MakeRoomPage,
    MyProfilePage,
    MySchedulePage,
    ManageUsersPage,
    ReserveEventPage,
    TodayPage,
    TomorrowPage,
    NextDaysPage,
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
    CalendarPage,
    MakeRoomPage,
    MyProfilePage,
    MySchedulePage,
    ManageUsersPage,
    ReserveEventPage,
    TodayPage,
    TomorrowPage,
    NextDaysPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsernameGlobalProvider,
    EventDataProvider
  ]
})
export class AppModule {}
