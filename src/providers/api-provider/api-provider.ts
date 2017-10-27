import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider{
    apiUrl = 'http://10.10.20.76:8080';
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

    // saveUser(data) {
    //     let headers = new Headers({ 'Accept':'application/json',
    //      'Content-Type':'application/json'});
        
    //      var requestoptions = new RequestOptions({
    //         method: RequestMethod.Post,
    //         url: this.apiUrl + '/user/add',
    //         headers: headers,
    //         body: JSON.stringify(data)
    //     })

    //     return this.http.post(this.apiUrl+'/user/add', JSON.stringify(data), { headers: headers });

    // }

    saveUser(data) {
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
         console.log(JSON.stringify(data))
        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/user/add', data , { headers: headers })
            .subscribe(res => {
                console.log(JSON.stringify(data))
                resolve(res);
            }, (err) => {
                console.log(JSON.stringify(data))
                console.log(err);
            });
        });
    }

}