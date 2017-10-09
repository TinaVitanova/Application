import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UsernameGlobalProvider } from '../providers/username-global/username-global';


@Injectable()
export class Validator {
    public UsernamesList = this.UsernameGlobal.getUsernames();
    constructor(public UsernameGlobal: UsernameGlobalProvider){

    }
    static isValidUsername(control: FormControl): any{
        
        if(isNaN(control.value)){
            return {
                "Enter Username": true
            };
        }
      /* if (isLoggedIn(control.value.toLowerCase()) == true)){
      return {
          "The User is already logged in":true
      };
    }
    */
    for (var i=0; i<this.UsernamesList.length; i++){
        if (control.value.toLowerCase() != this.UsernamesList[i]){
         return {
             "That User doesn't exist":true
         };
        }
        }
    return null;
    }
}