import { Component, OnInit } from '@angular/core';
import { ProductService } from './../_services/product.service';
import { MyOderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  constructor(private productService: ProductService){}

  displayedColumns = ["Name", "Address", 'Contact No.', 'Amount', 'Status']

  myOderDetails: MyOderDetails [] = [];

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getMyOders().subscribe(
      (resp: MyOderDetails[]) => {
        this.myOderDetails = resp;
        console.log(resp);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
