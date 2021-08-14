import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  baseUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  createOrder(createOrderDto,jwtToken){
    return this.http.post(this.baseUrl + `/mobile/createOrder/${jwtToken}`,createOrderDto);
  }
}
