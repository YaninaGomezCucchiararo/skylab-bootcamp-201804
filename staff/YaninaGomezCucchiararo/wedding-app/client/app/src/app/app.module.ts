import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";

//SERVICES:
import { ProductsService } from './services/products.service';

// COMPONENTS:
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing-.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ProductCardComponent } from './products/product-card/product-card.component';



@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
    LoginComponent,
    ProductDetailComponent,
    ProductAddComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ProductCardComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [
    HttpClient,
    ProductsService
  ], //nuestro axios se guardara aqui

  bootstrap: [AppComponent]
})
export class AppModule { }
