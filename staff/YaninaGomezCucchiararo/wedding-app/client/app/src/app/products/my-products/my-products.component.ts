import { Component, OnInit } from '@angular/core';


import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  userProducts: Product[] = [];
  public serverBaseUrl = '';

  constructor( private authService: AuthService) {

    this.authService.retrieveUserProducts()
      .subscribe((products:any) => {
        console.log(products);
        console.log(`Esto: ${products.data['_id']}`)
        this.userProducts = products.data
        
        
      })
   }


  ngOnInit() {
    this.serverBaseUrl = environment.serverBaseUrl;
    console.log("Holaaa:", this.userProducts)
  }

  removeProduct(id, index){
    this.authService.removeProduct(id)
    .subscribe(res => {
      this.userProducts = this.userProducts.splice(index, 1);
      console.log(res);
    })
  
  }
  
}
