import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from '../category-display/category-display.component';
import { CategoryService } from '../category.service';

export class PincodeDto{
  constructor(
    public pincode: string,
    public shopID: string
  ){}

}

@Component({
  selector: 'app-pincode-authentication',
  templateUrl: './pincode-authentication.component.html',
  styleUrls: ['./pincode-authentication.component.css']
})
export class PincodeAuthenticationComponent implements OnInit {

  jwtToken:string
  pincode:string
  pincodeDto: PincodeDto
  categoryDto:CategoryDto[]
  errorMessage="Please Type Valid Pincode"
  invalidLogin=false
  pincodeUrl:any
  splashscreen=true;
  loading=false
  //categoryDto: CategoryDto

   constructor(
  //   private pincodeDto: PincodeDto,
     private  route:ActivatedRoute,
     private router: Router,
     private categoryService: CategoryService,
     
  ) { }

  ngOnInit(): void {
    //this.pincode=this.route.snapshot.params['pincode']
    sessionStorage.setItem("currentPage", "pincodeVerification")
    this.pincodeDto=new PincodeDto(null,null)
    this.jwtToken=this.route.snapshot.params['jwtToken'];
    this.pincodeUrl=this.route.snapshot.params['pincode'];
    this.retrieveCategories();
    if(!sessionStorage.getItem('CategoryDetailsArray')){
      setTimeout(()=> {this.offSplashScreen()},3000)
    }
    else{
      this.splashscreen=false
    }
  //  this.pincode=this.route.snapshot.params['pincode'];
   }

   offSplashScreen(){
     this.splashscreen=false;
   }

   confirmPincode() {
    this.loading = true;
    if(this.pincodeDto.pincode == this.pincodeUrl){
      if(!sessionStorage.getItem('CategoryDetailsArray')){
        setTimeout( () => { this.confirmPincode1() }, 3000 );
        }
        else{
          this.confirmPincode1()
        }
    }
    else{
      this.router.navigate(['pincodeError']);
    }
    
  }

   confirmPincode1(){

    this.categoryService.getshopID(this.pincodeDto.pincode).subscribe(
       response=>{
         this.pincodeDto=response
         //this.retrieveCategories()
         if(this.pincodeDto.shopID!=null){
           sessionStorage.setItem("pincode",this.pincodeDto.pincode);
           sessionStorage.setItem("shopID",this.pincodeDto.shopID);
           if(!sessionStorage.getItem('CategoryDetailsArray')){
            this.loading=false;
            setTimeout( ()=>{this.router.navigate(['mobile/grocery',this.pincodeDto.pincode,this.pincodeDto.shopID,this.jwtToken]);},3000)
           }
           else{
             this.loading=false;
             this.router.navigate(['mobile/grocery', this.pincodeDto.pincode, this.pincodeDto.shopID,this.jwtToken]);
           }
         }
         else{
           this.router.navigate(['pincodeError']);
         }
         },
         error=>{
          this.router.navigate(['pincodeError']);
         } )
  }

  retrieveCategories(){
    if(!sessionStorage.getItem('CategoryDetailsArray')){
      this.categoryService.retrieveAllCategory(this.pincodeUrl,"abc",this.jwtToken).subscribe(
        response=>{
          this.categoryDto=response
          console.log(response)
          sessionStorage.setItem('CategoryDetailsArray',JSON.stringify(this.categoryDto));
          sessionStorage.setItem('jwtToken',this.jwtToken);
        }
      )
    }
    else{
      this.categoryDto=JSON.parse(sessionStorage.getItem('CategoryDetailsArray'));
      if(this.categoryDto.length==0){
        sessionStorage.removeItem('CategoryDetailsArray')
        this.retrieveCategories();
      }
    }
  }

    saveTodo(){
      console.log("hello")
    }

  }


