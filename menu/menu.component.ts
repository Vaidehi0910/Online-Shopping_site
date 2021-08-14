import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items=[];
  pincode=""
  shopID=""
  jwtToken=""

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  countProduct(){
    this.items = JSON.parse(sessionStorage.getItem("itemsInCart"));
    if(this.items){
      var size = 0;
      for(let i = 0; i < this.items.length; i++){
        size += this.items[i].countInCart;
      }
      return size;
    }
    else{
      return null
    }
  }

  hideThings(){
    let curPage = sessionStorage.getItem("currentPage")
    if(curPage === "errorPage" || curPage === "successPage" || curPage === "pincodeVerification" || curPage === "homePage" || curPage === "privacyPage" ){
      return false
    }
    else{
      return true
    }
  }

  homeclick(){
    this.pincode = sessionStorage.getItem("pincode")
    this.shopID = sessionStorage.getItem("shopID")
    this.jwtToken = sessionStorage.getItem('jwtToken')
    this.router.navigate(['mobile/grocery',this.pincode,this.shopID,this.jwtToken])
  }

}
