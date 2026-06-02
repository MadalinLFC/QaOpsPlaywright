import { expect, type Locator, type Page } from '@playwright/test';

//declare string
let message1 : string = "Hello";
message1 = "bye";

//declare number
let age1 : number = 2;
age1 = 3;

//declare boolean
let isActive1 : boolean = false;

//declare array
let numbers1 : number[] = [1,2,3];
//declare any type like in JS
let data : any = "this could be anything"//se comporta ca in JS, paote fi orice tip
data = 42; // pentru ca am pus any sus la declarare, nu mai da eroare daca ii asignez un numar
//declare function
function add(a : number,b : number):number
{
    return a+b;
}

add(3,4);
console.log(add(3,4));

// declare object
let user: {name:string, age:number} = {name:"Bob", age:23};


//declare classes
class CartPage 
{   page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

constructor(page: any)
{
    this.page= page;
    this.cartProducts= page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}}
