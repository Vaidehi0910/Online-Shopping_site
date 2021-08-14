import { Location } from '@angular/common';
import { Component, ContentChildren, OnInit, QueryList, ɵEMPTY_ARRAY } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, empty } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../service/cart.service';
import { JwtValidationService } from '../service/jwt-validation.service';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;
  inputnumber;
  totalAmount:string;
  categoryId
  total

  constructor(
    private cartService: CartService,
    private router:Router,
    private snackBarService: SnackbarService,
    public footerComponent: FooterComponent,
    private location : Location,
    private jwtValidate: JwtValidationService
  ){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage","cartPage")
   this.refresh();
   //console.log(this.items)
   this.categoryId=sessionStorage.getItem("categoryId")
   this.jwtValidate.validate(sessionStorage.getItem("jwtToken")).subscribe(
     respone => {
       if(!respone){
         sessionStorage.removeItem('CategoryDetailsArray')
         sessionStorage.removeItem('itemsInCart')
         this.router.navigate(['mobile/error'])
       }
     },
     error => {
       sessionStorage.removeItem('CategoryDetailsArray')
       sessionStorage.removeItem('itemsInCart')
       this.router.navigate(['mobile/error'])
     }
   )

  }
  refresh(){
    this.items=this.cartService.getItems();
    sessionStorage.setItem("items",JSON.stringify(this.items))
  }

  plus(product){
    this.cartService.addToCart(product);
    this.refresh();
  }
  minus(product){
    this.cartService.delete(product);
    this.refresh();
  }

  delete(product){
    this.cartService.deleteItem(product);
    this.footerComponent.getTotal();
    this.refresh();
  }
navigate(){
  this.location.back();
}
EmptyCart(){
  if(this.items.length === 0){
    return true;

  }
  else{
    return false;
  }
}
}


