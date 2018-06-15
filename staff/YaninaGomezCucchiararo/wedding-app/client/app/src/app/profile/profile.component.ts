import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  dataUser: any = {
    username:"",
    location:"",
    email:"",
    password:"",
    newEmail:"",
    newPassword:""
    }


  constructor( private authService: AuthService) { }

  handlerSubmit(){
    console.log(this.dataUser)

    this.authService.updateUser(this.dataUser)
      .subscribe(user => {
        console.log(user)
      })
  }
  ngOnInit() {

  }

}
