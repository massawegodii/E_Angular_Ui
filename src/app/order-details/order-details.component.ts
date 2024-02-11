import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  displayedColumns = ["Id","Product Name", "Name", "Address", "Contact No.", "Status", "Actions"]

  datasource = [];

  status: string = 'All';

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getAllOrderForAdmin(this.status);
  }

  getAllOrderForAdmin(status: string) {
    this.productService.getAllOrderForAdmin(status).subscribe(
      (resp: any) => {
        this.datasource = resp;
        console.log(resp);
      }, (err) => {
        console.log(err);
      }
    );

  }

  markAsDelivered(orderId: any) {
    this.productService.markOrderAsDelivered(orderId).subscribe(
      (resp) => {
        this.getAllOrderForAdmin(this.status);
        console.log(resp);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
