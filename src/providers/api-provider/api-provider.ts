import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider{
    apiUrl = 'http://10.10.20.177:8080';
    data:any;
    dataRooms:any;
    dataReservations:any;
    constructor(public http:Http){

    }

    getReservations(){
        if (this.dataReservations) {
            return Promise.resolve(this.dataReservations);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/reservation/getall')
            .map(res => res.json())
            .subscribe(dataReservations => {
                this.dataReservations = dataReservations;
                resolve(this.dataReservations);
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
        console.log(reservation)
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

    updateReservation(reservation){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.put(this.apiUrl+'/reservation/update', JSON.stringify(reservation) , { headers: headers })
            .subscribe(res => {
                console.log(res)
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    updateRoom(room){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.put(this.apiUrl+'/room/update', JSON.stringify(room) , { headers: headers })
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
    deleteRoom(room){
        let headers = new Headers({ 
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return new Promise(resolve => {
            this.http.delete(this.apiUrl+'/room/delete/'+room, { headers: headers })
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
        if (this.dataRooms) {
            return Promise.resolve(this.dataRooms);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/room/getall')
            .map(res => res.json())
            .subscribe(dataRooms => {
                this.dataRooms = dataRooms;
                resolve(this.dataRooms);
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

    getRole() {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'/role/role')
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

//         data.role=parseInt(data.role)

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
        return new Promise(resolve => {
            this.http.put(this.apiUrl+'/user/update', JSON.stringify(data) , { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

}