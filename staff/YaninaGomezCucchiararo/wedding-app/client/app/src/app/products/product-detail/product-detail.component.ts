import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



//Model:
import { Product } from './../../models/product'


//Service:
import { ProductsService } from '../../services/products.service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  
  public serverBaseUrl = '';
  public product: Product[] = [];

  constructor( 
    private activatedRoute: ActivatedRoute,
    private productService : ProductsService) 
    
  { 
    this.activatedRoute.params.subscribe( params => {
      // console.log(params['id']);
      const product = params['id'];
      this.productService.getProduct(product)
        .subscribe((product : any) => {
          console.log (product)
          this.product = product.data;

        })
    })
  }

  ngOnInit() {
    this.serverBaseUrl = environment.serverBaseUrl;
  }

}
