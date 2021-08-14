import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { PincodeDto } from '../pincode-authentication/pincode-authentication.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  pincodeDto: PincodeDto
  jwtToken:string

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem("currentPage","homePage")
  }
  seePrivacy(){
    this.router.navigate(['privacy-policy'])
  }
}
