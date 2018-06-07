//este archivo es para crear un esquema de usuario para el front

//interface sirve para crear los modelos

export interface User {
    username: string;
    email: string;
    password: string;
    products: string[];
}