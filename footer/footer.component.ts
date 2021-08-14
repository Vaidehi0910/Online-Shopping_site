import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { CheckoutService } from '../service/checkout.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // total=sessionStorage.getItem('total');
  items=[];
  cartPage: boolean;
  item;
  tally;

  constructor(
    private router:Router,
    public checkoutService: CheckoutService,
    private cartService: CartService,
    //public hardcodedservice:HardcodedAuthenticationService,
    private snackBarService:SnackbarService
  ) { }

  ngOnInit(): void {
  }

  checkCartPage(){
    var curPage = sessionStorage.getItem("currentPage")
    if(curPage === "cartPage"){
      this.cartPage=true;
      return "Checkout"
    }
    else{
      this.cartPage=false;
      return "Go To Cart"
    }
  }

  GoNext(){
    this.items = JSON.parse(sessionStorage.getItem("itemsInCart"));
    if(sessionStorage.getItem("currentPage") === "cartPage"){
      if(this.items && this.items.length != 0){
        if(this.getTotal()>=500){
          this.router.navigate(['checkout']);
        }
        else{
          this.snackBarService.openSnackBarDelete("Minimum Order should be 500","")
        }
      }
      else{
        this.snackBarService.openSnackBarDelete("Your Cart is Empty","")
      }
    }
    else{
      this.router.navigate(['cart']);
    }
}

hideThings(){
  let curPage = sessionStorage.getItem("currentPage")
  if( curPage === "checkout" || curPage === "errorPage" || curPage === "pincodeVerification" || curPage === "homePage" || curPage === "privacyPage" || curPage === "successPage"){
    return false
  }
  else{
    return true
  }
}

getTotal(){
  var total = 0;
  this.items=JSON.parse(sessionStorage.getItem('itemsInCart'))
  //console.log(this.items);
  if(this.items!=null){
 for (var i = 0; i < this.items.length; i++) {
   //console.log(this.items[i])
         total =total+ (this.items[i].sellingPrice * this.items[i].countInCart);
 }
 return total;
}
else{
  return 0;
}
}
checkDiff(){
  var total = 0;
  var mrp = 0;
  var save=0;
  this.item=JSON.parse(sessionStorage.getItem('itemsInCart'))
  //console.log(this.item);
  if(this.item!=null){
 for (var i = 0; i < this.item.length; i++) {
   //console.log(this.items[i])
    total =total+ (this.item[i].sellingPrice * this.item[i].countInCart);
    mrp= mrp +(this.item[i].mrp* this.item[i].countInCart);
 }
 save=mrp-total;
 //console.log(mrp)
 return save;
}
else{
return 0;
}
}
}
