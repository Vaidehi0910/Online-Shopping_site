import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';
import { PincodeDto } from '../pincode-authentication/pincode-authentication.component';
import { JwtValidationService } from '../service/jwt-validation.service';

export class ProductDetailsDto{
  constructor(
    public availability:string,
    public countInCart:number,
    public imgURI:string,
    public mrp:string,
    public prodCategoryID:string,
    public prodID:string,
    public prodName:string,
    public sellingPrice:string
  ){}
}
export class CategoryDto{
  constructor(
    public categoryID: string,
    public categoryName: string,
    public description: string,
    public imgBannerURI:string,
    public imgLogoURI:string,
    public prodDto: ProductDetailsDto[]
  ){}
}

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css'],
  providers: [ NgbCarouselConfig]
})
export class CategoryDisplayComponent implements OnInit {
  jwtToken:string
  pincodeDto:PincodeDto
  categoryDto: CategoryDto[]
  categoryName
  categoryId
  searchString=""
  loading=false
  pincode:string
  shopID:string

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private jwtValidateService: JwtValidationService  ,
    private categoryService: CategoryService ,
    config:NgbCarouselConfig,
    
  ) {
    config.interval=5000;
    config.wrap=true;
    config.keyboard=false;
    config.pauseOnHover=false;
  }

  ngOnInit(): void {
    this.loading=false
    sessionStorage.setItem("currentPage",'categoryPage')
    this.pincodeDto= new PincodeDto(null,null)
    this.pincode=this.route.snapshot.params['pincode'];
    this.shopID=this.route.snapshot.params['shopID'];
    this.jwtToken=this.route.snapshot.params['jwtToken'];
    if(this.jwtToken === sessionStorage.getItem('jwtToken')){
    }
    else{
      sessionStorage.removeItem('CategoryDetailsArray')
      sessionStorage.removeItem('itemsInCart')
    }
    this.jwtValidateService.validate(this.jwtToken).subscribe(
      response => {
        if(!response){
          sessionStorage.removeItem('CategoryDetailsArray')
          sessionStorage.removeItem('itemsInCart')
          this.router.navigate(['mobile/error']);
        }
        else{
          sessionStorage.getItem('itemsInCart')
          this.retrieveCategory();
        }
      },
      error => {
        sessionStorage.removeItem('CategoryDetailsArray')
        sessionStorage.removeItem('itemsInCart')
        this.router.navigate(['mobile/error']);
      }
    )
  }


  retrieveCategory(){
    this.loading=true
    if(!sessionStorage.getItem('CategoryDetailsArray')){
      this.categoryService.retrieveAllCategory(this.pincodeDto.pincode,this.pincodeDto.shopID,this.jwtToken).subscribe(
        response=>{
          this.categoryDto=response
          this.loading=false
          sessionStorage.setItem('CategoryDetailsArray',JSON.stringify(this.categoryDto));
          sessionStorage.setItem('jwtToken',this.jwtToken);
          sessionStorage.setItem('pincode',this.pincodeDto.pincode)
          sessionStorage.setItem('shopId',this.pincodeDto.shopID)

    },
    error=>{
      sessionStorage.removeItem('CategoryDetailsArray')
      sessionStorage.removeItem('itemsInCart')
    })
  }
    else{
      this.categoryDto=JSON.parse(sessionStorage.getItem('CategoryDetailsArray'))
      if(this.categoryDto.length==0){
        sessionStorage.removeItem('CategoryDetailsArray')
        this.retrieveCategory();
      }
      this.loading=false;
    }
    }


  Route(prodDto){
    //console.log(prodDto)
    sessionStorage.setItem("prodDto",JSON.stringify(prodDto))
    //this.router.navigate(['showProducts',categoryID])
  }

  
  Router(categoryID,categoryName){
    this.router.navigate(['showProducts',categoryID])
    this.categoryId=sessionStorage.setItem("categoryId",categoryID)
    this.categoryName=sessionStorage.setItem("categoryName",categoryName)
  }

  searchStringLength(){
    return this.searchString.length
  }
  // Store(categoryName){
  //   sessionStorage.setItem("categoryName",categoryName)
  // }

}
