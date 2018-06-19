import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showHeader:boolean =false;

  constructor( private authservice: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.authservice.ifLogged.subscribe((value:boolean) =>{
      this.showHeader = value;
    })

  }

  logout() {
    this.showHeader = false;
    this.router.navigate(['']);
  }
}
