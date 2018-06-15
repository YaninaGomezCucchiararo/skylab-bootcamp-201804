import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];

  userData: any[] = [];

  userId = localStorage.getItem('id');
  

  url: string = "http://localhost:5000/api/users";
  urlAuth: string = "http://localhost:5000/api/auth";
  urlUser: string = `http://localhost:5000/api/users/${this.userId}`

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });


  constructor(private http: HttpClient) {
      console.log(this.userId)
      this.cargarData()
      
  }
  //..............LOCAL STORAGE...........
    actualizarData () {
      // localStorage.setItem("data", JSON.stringify(this.userData)) 
      localStorage.setItem("token", this.userData[0].data.token)
      localStorage.setItem("id", this.userData[0].data.id)  
    }

    cargarData () {
      if(localStorage.getItem("data")) {
        this.users = JSON.parse(localStorage.getItem("data")) 
      }
    }

    agregarUserData ( data ){
      this.userData.push(data);
      this.actualizarData();
    }
  // //........................................
  
  

  register(user: User) {

    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.url, user)
      .pipe(map(res => {
        console.log(res)
        return res
      }))

  }

  login(params) {
    let body = JSON.stringify(params);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.urlAuth, params)
      .pipe(map(res => {
        console.log(res)
        return res
      }))
  }

  updateUser(dataUser) {

    console.log(localStorage.getItem('token'));

    let body = JSON.stringify(dataUser);
  

    return this.http.patch(this.urlUser, dataUser, { headers: this.headers })
      .pipe(map(res => {
        console.log(res)
        return res
      }))

  }

}

