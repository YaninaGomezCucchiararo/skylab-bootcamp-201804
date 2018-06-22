import { Injectable } from '@angular/core';
import { Product } from '../models/product'
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // url: string = "https://fierce-reaches-16715.herokuapp.com/api";
  _url: string = "http://localhost:5000/api";
  url: string = "http://192.168.0.32:5000/api";


  constructor(
    private http: HttpClient
  ) { }

  getProducts(){
    return this.http.get(`${this.url}/products`)
  }

  getProduct(id) {

    return this.http.get(`${this.url}/products/${id}`)
  }
}  
