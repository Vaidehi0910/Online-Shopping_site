import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailsDto } from '../category-display/category-display.component';
import { CartService } from '../service/cart.service';
import { CreateOrderService } from '../service/create-order.service';
import { JwtValidationService } from '../service/jwt-validation.service';
import { SnackbarService } from '../service/snackbar.service';

export class CreateOrderDto{
  constructor(
    public uid: string,
    public shopID: string,
    public name: string,
    public phone: string,
    public email: string,
    public address:string,
    public pincode:string,
    public orderStatus: string,
    public orderID: string,
    public orderSource: string,
    public totalAmount:any,
    public orderCreationtime: string,
    public orderDelieveredTime: string,
    public paymentMode:string,
    public modeIsPickup:string,
    public comments: string,
    public prodDto: ProductDetailsDto[]
  ){}
}

export class OrderDetailsDto{
  constructor(public orderID: string){}
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit {
  items
  createOrderDto: CreateOrderDto
  orderDetailsDto: any
  loading = false;

  constructor(
    private cartservice: CartService,
    private jwtValidate: JwtValidationService,
    private router: Router,
    private createOrderService: CreateOrderService,
    private snackbar: SnackbarService,
    private datePipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loading=false;
    sessionStorage.setItem("currentPage","checkout")
    this.jwtValidate.validate(sessionStorage.getItem("jwtToken")).subscribe(
      response => {
        if (!response) {
          sessionStorage.removeItem('CategoryDetailsArray')
          sessionStorage.removeItem('itemsInCart')
          this.router.navigate(['']);
        }
      },
      error => {
        sessionStorage.removeItem('CategoryDetailsArray')
        sessionStorage.removeItem('itemsInCart')
        this.router.navigate(['']);
      }
    )

    this.createOrderDto = new CreateOrderDto(null, sessionStorage.getItem('shopID'),null,null,null,null,sessionStorage.getItem('pincode'),"New",null,"MobileWA",this.getTotal(),this.datePipe.transform(new Date(), 'h:mm a, MMMM d, y'),null,"cash","false",null, this.cartservice.getItems())
  }

  confirmOrder() {
    this.loading = true;
    this.items = JSON.parse(sessionStorage.getItem("itemsInCart"));
      if (this.items != null && this.items.length != 0 && this.getTotal() >= 500) {
        this.jwtValidate.validate(sessionStorage.getItem("jwtToken")).subscribe(
          response => {
            console.log(response)
            if (!response) {
              this.loading = false;
              sessionStorage.removeItem('CategoryDetailsArray')
              sessionStorage.removeItem('itemsInCart')
              this.router.navigate(['mobile/error']);
            }
            else {
              this.createOrderService.createOrder(this.createOrderDto, sessionStorage.getItem("jwtToken")).subscribe(
                response => {
                  this.loading = false;
                  this.orderDetailsDto = response
                //  sessionStorage.removeItem('CategoryDetailsArray')
                  sessionStorage.removeItem('itemsInCart')
                  this.cartservice.clearCart();
                  this.router.navigate(['/success', this.orderDetailsDto.orderID]);
                },
                error => {
                  this.loading = false;
                  sessionStorage.removeItem('CategoryDetailsArray')
                  sessionStorage.removeItem('itemsInCart')
                  this.router.navigate(['mobile/error']);
                }
    
              )
            }
          },
          error => {
            this.loading = false;
            sessionStorage.removeItem('CategoryDetailsArray')
            sessionStorage.removeItem('itemsInCart')
            this.router.navigate(['mobile/error']);
          }
        )
    
    
      }
      else{
        if(this.getTotal() < 500){
          this.loading = false;
          this.snackbar.openSnackBarDelete("Minimum Order should be 500","")
        }
        else{
          this.loading = false;
        this.snackbar.openSnackBarDelete("Your Cart is Empty","")
        }
      }
    


  }

  getTotal(){
    var total =0;
    this.items = JSON.parse(sessionStorage.getItem("itemsInCart"));     
    if(this.items!=null)  {
      for (let i = 0; i < this.items.length; i++) {
       total = total + (this.items[i].countInCart * this.items[i].sellingPrice)
      }
       return total;
    }
    else{
      return 0;
    }
  }

  backPage(){
    this.location.back();
  }

}
