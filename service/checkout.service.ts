import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private router: ActivatedRoute) { }

  Cart(){
    let cart= this.router.snapshot.params['cart']
    console.log(cart)
    if(cart==='cart'){
      return true;
    }
    return false;
   }
}
