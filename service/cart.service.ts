import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { jsDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryDto } from '../category-display/category-display.component';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items=[];
  index
  categoryList=[];
  productList=[];
  matchCategory:CategoryDto
  constructor(private snackbar:SnackbarService) { }

  addToCart(product){
    var matchItem;
    if(JSON.parse(sessionStorage.getItem("itemsInCart"))){
      this.items=JSON.parse(sessionStorage.getItem("itemsInCart"))
      matchItem=this.items.filter(i=>i.prodID===product.prodID)[0];
      this.items=this.items.filter(i=>i.prodID!== product.prodID);
    }
    if(matchItem){
      var pos=JSON.parse(sessionStorage.getItem("itemsInCart")).map(function(e){ return e.prodID; }).indexOf(product.prodID);
      if(matchItem.countInCart<10){
        matchItem.countInCart=matchItem.countInCart + 1;
        this.snackbar.openSnackBar("Updated Successfully!!!","")
      }
      else{
        this.snackbar.openSnackBarDelete("You can add maximum 10 products","")
      }
      this.items.splice(pos,0,matchItem);
    }
    else{
      product.countInCart = product.countInCart + 1;
      this.items.push(product);
      this.snackbar.openSnackBar("Added in Cart!!!",'');
    }
    sessionStorage.setItem("itemsInCart",JSON.stringify(this.items))
  }

  getItems(){
    return JSON.parse(sessionStorage.getItem("itemsInCart"));
  }
  clearCart(){
    this.items=[];
    sessionStorage.setItem("itemsInCart",JSON.stringify(this.items))
    return JSON.parse(sessionStorage.getItem("itemsInCart"));
  }

  delete(product){
    var matchItem;
    this.items=JSON.parse(sessionStorage.getItem("itemsInCart"))
    matchItem=this.items.filter(i=> i.prodID === product.prodID)[0];
    var pos= this.items.map(function (e) { return e.prodID; }).indexOf(product.prodID);
    this.items=this.items.filter(i => i.prodID !== product.prodID);
    if(matchItem.countInCart!==1){
      matchItem.countInCart = matchItem.countInCart - 1;
      this.items.splice(pos,0,matchItem);
      this.snackbar.openSnackBarDelete("Deleted Successfully","")
    }
    else{
      this.snackbar.openSnackBarDelete("Item Deleted","")
    }
    sessionStorage.setItem("itemsInCart",JSON.stringify(this.items))
  }

  deleteItem(product){
    //console.log(product)
    this.items=JSON.parse(sessionStorage.getItem("itemsInCart"))
    //console.log(this.items)
    this.index= this.items.map(function (e) { return e.prodID} ).indexOf(product.prodID);
   // console.log(this.index)
    this.items.splice(this.index,1);
    sessionStorage.setItem("itemsInCart",JSON.stringify(this.items));
    this.snackbar.openSnackBarDelete("Item Deleted","")
  }


}
