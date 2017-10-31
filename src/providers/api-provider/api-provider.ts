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

    getFreeRooms(data1,data2){
        if (this.data) {
            return Promise.resolve(this.data);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/reservation/getallfreeroooms'+ data1 + '/' +data2)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }

    addReservation(reservation){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/reservation/add', JSON.stringify(reservation) , { headers: headers })
            .subscribe(res => {
                console.log(res)
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    deleteReservation(reservation){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.delete(this.apiUrl+'/reservation/delete/'+reservation, { headers: headers })
            .subscribe(res => {
                console.log(res)
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    addRoom(room){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/room/add', JSON.stringify(room) , { headers: headers })
            .subscribe(res => {
                console.log(res)
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    getRooms(){
        if (this.data) {
            return Promise.resolve(this.data);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/room/getall')
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
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