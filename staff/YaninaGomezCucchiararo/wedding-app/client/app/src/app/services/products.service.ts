import { Injectable } from '@angular/core';
import { Product } from '../models/product'
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(){
    return this.http.get('http://localhost:5000/api/products')
  }

  getProduct(id) {

    return this.http.get(`http://localhost:5000/api/products/${id}`)
  }
}  
