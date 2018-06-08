import { Injectable } from '@angular/core';
import { Product } from './models/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 private products:Product[] = [
    {
      image: "image",
      price: "50",
      size: "38",
      color: "blanco",
      owner: "yanina"
    },
    {
      image: 'image',
      price: "100",
      size: "40",
      color: "beige",
      owner: "yanina"
    },
  ];

  constructor() {
    console.log('creado el serviciooo!')
   }

   getProducts():Product[]{
     return this.products;
   }

}
