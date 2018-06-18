import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showHeader:boolean =false;

  constructor( private authservice: AuthService) { }

  ngOnInit() {
    this.authservice.ifLogged.subscribe((value:boolean) =>{
      this.showHeader = value;
    })

  }

}
