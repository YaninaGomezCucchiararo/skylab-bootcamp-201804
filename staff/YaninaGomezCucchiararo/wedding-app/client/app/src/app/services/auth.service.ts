import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public ifLogged = new Subject();

  users: User[] = [];

  userData: any;

  userId = localStorage.getItem('id');


  url: string = "http://localhost:5000/api/users";
  urlAuth: string = "http://localhost:5000/api/auth";


  constructor(private http: HttpClient) {
    console.log(this.userId)
    this.cargarData()

  }

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  //..............LOCAL STORAGE...........
  actualizarData() {
    localStorage.setItem("token", this.userData.token)
    
    this.userId = this.userData.id
    localStorage.setItem("id", this.userData.id)
  }

  cargarData() {
    if (localStorage.getItem("data")) {
      this.users = JSON.parse(localStorage.getItem("data"))
    }
  }

  agregarUserData(data: any) {
    this.userData = data;
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
      .pipe(
        tap(() => { this.ifLogged.next(true)}),
        map(res => {
        console.log(res)
        return res
      }))
  }

  updateUser( dataUser ) {

    console.log(localStorage.getItem('token'));

    let body = JSON.stringify(dataUser);

    return this.http.patch(`http://localhost:5000/api/users/${this.userId}`, dataUser, { headers: this.headers() })
      .pipe(map(res => {
        console.log(res)
        return res
      }))

  }

  retrieveUserProducts() {
    
    return this.http.get(`http://localhost:5000/api/users/${this.userId}/products`,{ headers: this.headers() })
      .pipe(map ( res => {
        console.log(res)
        return res
      }))
  }


  addProduct (params) {
    
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    let fd = new FormData();

    fd.append('image', params.image, params.image.name);
    fd.append('price', params.price);
    fd.append('size', params.size);
    fd.append('color', params.color);
    fd.append('description', params.description);

    return this.http.post(`http://localhost:5000/api/users/${this.userId}/products`, fd, { headers: headers })
  }

}

