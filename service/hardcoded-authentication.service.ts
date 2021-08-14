import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor(
    private route:ActivatedRoute
  ) { }

  authenticate(pincode){
    if(pincode==="124112"){
      sessionStorage.setItem('pincode',pincode)
      return true;
    }
    return false;
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('pincode');
   // console.log(user)
    return !(user==='undefined');
  }

  isUserInCart(){
    let user= this.route.snapshot.params['cart'];
    if(user==='cart'){
      return true;
    }
    return false;
  }
}
