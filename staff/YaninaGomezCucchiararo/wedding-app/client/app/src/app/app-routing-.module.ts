import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from "./auth/login/login.component";
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";

const routes: Routes = [ //aqui estaran todas nuestras rutas
    { path: '', component: HomepageComponent },//hemos creado nuestra primera ruta!
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'product/add', component: ProductAddComponent},
    { path: 'product/detail', component: ProductDetailComponent},   
] 

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule {} 