import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider{
    apiUrl = 'http://10.10.20.177:8080';
    data:any;
    
    constructor(public http:Http){
        
    }

    getReservations(){
        if (this.data) {
            return Promise.resolve(this.data);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/reservation/getall')
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }
    addReservation(ress){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/reservation/add', JSON.stringify(ress) , { headers: headers })
            .subscribe(res => {
                console.log(res)
                console.log(JSON.stringify(ress))
                resolve(res);
            }, (err) => {
                console.log(JSON.stringify(ress))
                console.log(err);
            });
        });
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
    // getRole(){
    //     if (this.data2) {
    //         return Promise.resolve(this.data2);
    //     }
    //       return new Promise(resolve => {
    //         this.http.get('10.10.20.177:8080/role/get/1')
    //         .map(res => res.json())
    //         .subscribe(data2 => {
    //             this.data2 = data2;
    //             resolve(this.data2);
    //         });
    //     });
    // }

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
        data.role=parseInt(data.role)
        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/user/add', JSON.stringify(data) , { headers: headers })
            .subscribe(res => {
                console.log(res)
                resolve(res);
            }, (err) => {
                console.log(JSON.stringify(data))
                console.log(err);
            });
        });
    }

}