import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:5000/api/users";
  urlAuth: string = "http://localhost:5000/api/auth";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  });

 
  constructor( private http: HttpClient) { }

  register ( user:User ){

    let body = JSON.stringify( user );
    let headers = new HttpHeaders ({
      'Content-Type':'application/json'
    });

    return this.http.post(this.url, user)
      .pipe(map (res => {
        console.log(res)
        return res
      }))

  }

  login ( params ) {
    let body = JSON.stringify( params );
    let headers = new HttpHeaders ({
      'Content-Type':'application/json'
    });

    return this.http.post(this.urlAuth, params)
      .pipe(map (res => {
        console.log(res)
        return res
      }))
  }

  updateUser ( user:User ){

    let body = JSON.stringify( user );
    let headers = new HttpHeaders ({
      'Content-Type':'application/json'
    });

    return this.http.patch(this.url, user, {headers})
      .pipe(map (res => {
        console.log(res)
        return res
      }))

  }

}

 