import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsernameGlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsernameGlobalProvider {

  myUsername:string;
  constructor(public http: Http) {
    this.myUsername = "";

    console.log('Hello UsernameGlobalProvider Provider');
  }
  setMyGlobalVar(value) {
    this.myUsername = value;
  }
  getMyGlobalVar() {
    return this.myUsername;
  }

}