import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto, ProductDetailsDto } from '../category-display/category-display.component';
import { CategoryService } from '../category.service';
import { FooterComponent } from '../footer/footer.component';
import { PincodeDto } from '../pincode-authentication/pincode-authentication.component';
import { CartService } from '../service/cart.service';
import { JwtValidationService } from '../service/jwt-validation.service';
import { SnackbarService } from '../service/snackbar.service';
// import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  jwtToken:string
  pincodeDto:PincodeDto
  categoryDto: CategoryDto[]
  allProductDto:ProductDetailsDto[]
  categoryName
  orderID:string
  items
  searchString:string
  pincode:string
  shopID:string


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackbarService,
    public footerComponent:FooterComponent,
    private cartService:CartService,
    private location: Location,
    private jwtValidation: JwtValidationService,
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem("currentPage","productPage")
    this.allProductDto=JSON.parse(sessionStorage.getItem("prodDto"))
    this.categoryName=sessionStorage.getItem("categoryName")
    this.pincodeDto= new PincodeDto(null,null)
    this.jwtToken=sessionStorage.getItem("jwtToken")
    this.refresh();
    this.jwtValidation.validate(sessionStorage.getItem("jwtToken")).subscribe(
      response => {
        //console.log(response)
        if (!response) {
          sessionStorage.removeItem('CategoryDetailsArray')
          sessionStorage.removeItem('itemsInCart')
          this.router.navigate(['mobile/error']);
        }
      },
      error => {
        sessionStorage.removeItem('CategoryDetailsArray')
        sessionStorage.removeItem('itemsInCart')
        this.router.navigate(['mobile/error']);
      }
    )
  }

  refresh(){
    this.categoryName=sessionStorage.getItem("categoryName")
    this.items=this.cartService.getItems();
    sessionStorage.setItem("items",JSON.stringify(this.items))
    //console.log(this.items);
  }
   Navigate(){
//  this.router.navigate(['mobile/grocery/',this.pincodeDto.pincode,this.pincodeDto.shopID,this.jwtToken])
    this.location.back()
}

  addToCart(product){
    this.cartService.addToCart(product);
    // this.message=`Added Successfully!`
    // this.refresh();
    this.footerComponent.getTotal()
}
isEmpty(){
  if(this.allProductDto.length === 0){
    return true;
  }
  return false
}

}
