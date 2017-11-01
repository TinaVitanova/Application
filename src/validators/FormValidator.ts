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
        if(control.value != Validator.globalProvider.getMyGlobalVar()){
            if (Validator.globalProvider.checkUsername(control.value))
                return {
                    "That username already exists": true
                }
        }
        return null;
    }

    isNewEmailValid(control: FormControl):any{
        if(control.value != Validator.globalProvider.getEmail()){
            if (Validator.globalProvider.checkEmail(control.value))
            return {
                "That email already exists": true
            }
        }
        return null;
    }

    isGlobalUsernameValid(control: FormControl):any{
        if(control.value == Validator.globalProvider.getMyGlobalVar() || control.value != Validator.globalProvider.getMyGlobalVar()){
            if (Validator.globalProvider.checkUsername(control.value))
                return {
                    "That username already exists": true
                }
        }
        return null;
    }

    isGlobalEmailValid(control: FormControl):any{
        if(control.value == Validator.globalProvider.getEmail() || control.value != Validator.globalProvider.getEmail()){
            if (Validator.globalProvider.checkEmail(control.value))
            return {
                "That email already exists": true
            }
        }
        return null;
    }

    isEventTitleValid(control: FormControl):any{
            if(!Validator.eventProvider.checkTitle(control.value)){
            return {
                "That title already exists":true
            }
        }
        return null;
    }

    isRoomCapacityValid(control: FormControl):any{
        if(control.value <1 || control.value >30){
            return {
                "Invalid room capacity": true
            }
        }
        return null;
    }
}