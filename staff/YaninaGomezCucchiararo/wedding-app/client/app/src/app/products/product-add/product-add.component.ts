import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  
  public loading: boolean = true;
  public product = {
    image: null,
    price:'', 
    size: '',
    color: '',
    description: ''
  }

  constructor( private authService: AuthService ) { 

    
  }
  handlerSubmit() {
    
    this.authService.addProduct({
        ...this.product,
        price: +this.product.price,
        size: +this.product.size
    })
    .subscribe(res => {
      // this.loading = false;
    })
  }

  onFileSelected(event) {
    this.product.image = event.target.files[0];
  }

  ngOnInit() {
  }

}
