import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider{
    apiUrl = 'http://10.10.20.177:8080';
    data:any;
    data1:any
    
    constructor(public http:Http){
        
    }

    getRole() {
        if (this.data1) {
            return Promise.resolve(this.data1);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/role/role')
            .map(res => res.json())
            .subscribe(data1 => {
                this.data1 = data1;
                resolve(this.data1);
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

    

    addUser(data) {
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/user/add', JSON.stringify(data) , { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    editUser(data) {
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        console.log(data)
        return new Promise(resolve => {
            this.http.put(this.apiUrl+'/user/update',JSON.stringify(data), { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    deleteUser(data){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.delete(this.apiUrl+'/user/delete/'+data, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

}