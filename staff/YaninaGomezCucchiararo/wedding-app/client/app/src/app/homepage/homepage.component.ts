import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Product } from './../models/product'

//Service:
import { ProductsService } from '../services/products.service';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
 // public searchInput: FormControl;
  
 //EZE:
  //products: Observable<Product[]>;
  products: Product[] = [];
  loading: boolean;

  constructor( private productsService: ProductsService ) { 

    this.loading = true;

    this.productsService.getProducts()
      .subscribe( (data: any) => {
        console.log(data.data);
        this.products = data.data;
        this.loading = false;
        
      })
  }

	ngOnInit() {
    //EZE:
    // this.products = this.productsService.getProducts();
    
  }

}

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent implements OnInit {
//   public searchInput: FormControl; //creará una propiedad del tipo formcontrol
//   constructor() { }

//   ngOnInit() {
//     this.searchInput = new FormControl();
//     //console.log(this.searchInput);
//     //Todos los eventEmitter son observables
//     this.searchInput.valueChanges
//       .subscribe((value: string) => {
//         console.log(value);
//       }) //vamos a recibir un valor, en este caso el del input
//   }

// }


//......................codigo eze...................

  // public  searchInput: FormControl;
  // public vestidos: any[] = [];

// this.products = this._productsService.getProducts();
    // console.log(this.products);

   


    //console.log(this.http)
		// this.searchInput = new FormControl();
    // this.searchInput.valueChanges
    //   .pipe(
    //     debounceTime(400), //este es para establecer un time en la busqueda "restraso"
    //     distinctUntilChanged(),
    //     filter((value: string) => {
    //       return value.length > 0; //minimo un caracter
    //     })
    //   ) //es un metodo q recibe argumentos tantos queramos, cada argumento es un operador de rxjs, se realiza antes de enviarlo al observado
		// 	.subscribe((value: string) => {
    //     //console.warn(value);
    //     this.http.get(`https://api.github.com/search/repositories?q=${value}`)
    //     .subscribe((data:any) =>{
    //       this.vestidos = data.items
    //     })
		// 	});