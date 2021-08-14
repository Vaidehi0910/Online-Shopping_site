import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryDisplayComponent } from './category-display/category-display.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorPincodeComponent } from './error-pincode/error-pincode.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PincodeAuthenticationComponent } from './pincode-authentication/pincode-authentication.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  {path : '' ,component:HomePageComponent},
  {path : 'pincodeError' ,component:ErrorPincodeComponent},
  {path : 'mobile/grocery/:jwtToken/:pincode', component : PincodeAuthenticationComponent},
  {path : 'mobile/grocery/:pincode/:shopID/:jwtToken', component : CategoryDisplayComponent},
  {path : 'showProducts/:prodDto', component : ProductDisplayComponent},
  {path : 'cart', component : CartComponent},
  {path : 'checkout', component : CheckoutComponent},
  { path: 'success/:orderID', component:  SuccessPageComponent},
  { path: 'privacy-policy', component:  PrivacyPageComponent},
  { path: 'mobile/error', component:  ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
