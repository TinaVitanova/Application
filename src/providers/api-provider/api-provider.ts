import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider{
    apiUrl = 'http://10.10.20.177:8080';
    data;
   
    constructor(public http:Http){
        
    }
    
    getUser() {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/user/getall')
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }

    saveUser(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/user/getall', JSON.stringify(data))
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });
    }

}