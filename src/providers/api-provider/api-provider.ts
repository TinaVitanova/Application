import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider{
    apiUrl = 'http://10.10.20.177:8080';
    data:any;
    
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
        //let body = JSON.stringify({});
        let headers = new Headers({ 'Accept':'application/json',
         'Content-Type':'application/json'});
        
        return new Promise((resolve) => {
            this.http.post(this.apiUrl+'/user/add', JSON.stringify(data), { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

}