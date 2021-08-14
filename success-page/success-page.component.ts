import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {
  orderID
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem("currentPage","successPage")
    this.orderID = this.route.snapshot.params['orderID']
  }

}
