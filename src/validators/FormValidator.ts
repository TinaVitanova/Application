import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UsernameGlobalProvider } from '../providers/username-global/username-global';
import { EventDataProvider } from '../providers/event-data/event-data';

@Injectable()
export class Validator {
    static globalProvider: UsernameGlobalProvider;
    static eventProvider: EventDataProvider;
    static User_REGEXP = /[\w.]+/;
    constructor(public UserGlobal: UsernameGlobalProvider, public EventData: EventDataProvider){
        Validator.globalProvider = UserGlobal;
        Validator.eventProvider = EventData;
    }
    isValidUsername(control: FormControl): any{
        
       // if(!control.value || !Validator.User_REGEXP.test(control.value)){
      //      return Promise.resolve({ invalid: true });
      //  }
      if (!Validator.globalProvider.checkUsername(control.value))
      return {
          "That username doesn't exist": true
      }
      return null;
       // .then(data => data && data.available ? null : data)
      //  .catch(err => console.error(err));   
    }
    isValidPassword(control: FormControl): any{
      /*
        if (!Validator.globalProvider.checkPassword(control.value))
        return {
            "Incorrect password": true
        }
        */
        return null;
    }
    isTimeDifferent(control: FormControl): any{
        if (Validator.eventProvider.getFlagStartEndTime())
        return {
            "The start and end Time can't be the same": true
        }
          return null;
    }
    isRoomValid(control: FormControl): any{
        if (Validator.eventProvider.checkRoomName(control.value))
        return {
            "That room already exists":true
        }
        return null;

    }
    isNewUsernameValid(control: FormControl):any{
        if (Validator.globalProvider.checkUsername(control.value))
        return {
            "That username already exists": true
        }
        return null;
    }
    isEmailValid(control: FormControl):any{
        if (!Validator.globalProvider.checkUsername(control.value))
        return {
            "That email already exists": true
        }
        return null;
    }
}