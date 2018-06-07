import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";


import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing-.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';




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
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [
    HttpClient
  ], //nuestro axios se guardara aqui
  bootstrap: [AppComponent]
})
export class AppModule { }
