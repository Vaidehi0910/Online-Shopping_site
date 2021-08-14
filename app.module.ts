import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PincodeAuthenticationComponent, PincodeDto } from './pincode-authentication/pincode-authentication.component';
import { CategoryDisplayComponent } from './category-display/category-display.component';
import { FormsModule, NgModel, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { matSnackBarAnimations, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './slider/slider.component';
import { ErrorPincodeComponent } from './error-pincode/error-pincode.component';
import { DatePipe } from '@angular/common';
import { SuccessPageComponent } from './success-page/success-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PincodeAuthenticationComponent,
    CategoryDisplayComponent,
    MenuComponent,
    ProductDisplayComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    SliderComponent,
    ErrorPincodeComponent,
    SuccessPageComponent,
    ErrorPageComponent,
    PrivacyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [FooterComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
