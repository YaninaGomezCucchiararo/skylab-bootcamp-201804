import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Service:
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  params = {
    email: '',
    password: ''
  }

  constructor( private authService: AuthService,
               private router: Router ) { }

  handlerSubmit() {

    console.log(this.params);

    this.authService.login( this.params )
      .subscribe( data => {
        this.router.navigate([''])
      },
      error => console.error(error))
  }

  ngOnInit() {
  }

}
