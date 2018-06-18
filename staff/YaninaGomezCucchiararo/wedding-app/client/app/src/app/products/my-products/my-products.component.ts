import { Component, OnInit } from '@angular/core';


import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  userProducts: Product[] = [];

  constructor( private authService: AuthService) {

    this.authService.retrieveUserProducts()
      .subscribe((products:any) => {
        this.userProducts = products.data
      })
   }


  ngOnInit() {
  }

  
}
