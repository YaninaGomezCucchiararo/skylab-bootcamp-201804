import { Injectable } from '@angular/core';
import { Product } from '../models/product'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

getProducts(): Observable<Product[]> {
  return this.http.get('http://localhost:5000/api/products')
    .pipe(
      switchMap((res: any) => of(res.data)),
      tap(res => console.log('Response:', res))
    );
}

}
