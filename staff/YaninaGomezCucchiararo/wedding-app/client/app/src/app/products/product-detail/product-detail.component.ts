import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators'
import { Subscription, Observable } from 'rxjs';

//Model:
import { Product } from './../../models/product'


//Service:
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  //public searchInput: FormControl;

  products: Observable<Product[]>

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    
  }

}
