import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtValidationService {

  baseUrl = environment.baseUrl;

  constructor(
    private http:HttpClient
  ) { }
  validate(jwtToken:String){
    return this.http.get<boolean>(this.baseUrl+`/mobile/validate/${jwtToken}`);
  }
}
