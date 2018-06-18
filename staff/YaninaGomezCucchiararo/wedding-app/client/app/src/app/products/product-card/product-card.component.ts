import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../models/product';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any[] = []; //la propiedad product PUEDE VENIR DESDE FUERA "input"
  @Input() productId: string;

  public serverBaseUrl = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.serverBaseUrl = environment.serverBaseUrl;
  }

  goToProduct(id) {
    console.log(this.productId)
    this.router.navigate(['product', this.productId])
  }

}
