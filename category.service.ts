import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryDto } from './category-display/category-display.component';
import { PincodeDto } from './pincode-authentication/pincode-authentication.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

    retrieveAllCategory(pincode:String,shopId:String,jwtToken:String){
      return this.http.get<CategoryDto[]>(this.baseUrl +`/mobile/category/${pincode}/${shopId}/${jwtToken}`)
    }
    getshopID(pincode: any) {
      return this.http.get<PincodeDto>(this.baseUrl + `/mobile/category/${pincode}`);
    }

}
// http://www.ddstore.in/mobile/grocery/eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDMxMjk4MDMsImlhdCI6MTYwMzEyNzEwM30.lvwnqQeJ6xqRGUwbJyOxq_A-vaEx5HCI1p-petxDY20/124112
