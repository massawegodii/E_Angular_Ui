import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
// import Razorpay from 'razorpay';

declare var Razorpay : any;

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css',
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: string | null = '';

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    transactionId: '',
    alternateContactNumber: '',
    orderProductQuantityList: [],
  };

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1,
      })
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (res)=>{
        console.log(res);
        orderForm.reset(res);
        const ngZone = this.injector.get(NgZone);
        ngZone.run(
          () => {
            this.router.navigate(["/orderConfirm"]);
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  getQuantityForProduct(productId: any) {
    const filtedProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filtedProduct[0].quantity;
  }

  getCalculatedTotal(productId:any , productDiscountedPrice: any) {
    const filtedProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filtedProduct[0].quantity * productDiscountedPrice
  }

  onQuantityChanged(q:any, productId:any) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
       const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0]
       .productDiscountedPrice
       grandTotal = grandTotal + price * productQuantity.quantity
      }
    );
    return grandTotal;
  }

  
  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (resp) => {
        console.log(resp);
        this.openTrasactionModel(resp, orderForm);
      }, (err) => {
        console.log(err);
      }
    );
  }

  openTrasactionModel(resp:any, orderForm: NgForm) {
    var options = {
      order_id : resp.orderId,
      key : resp.key,
      amount : resp.amount,
      currency : resp.currency,
      name : 'Massawe Godfrey',
      description : 'Payment of Online Shopping',
      image : 'https://cdn.pixabay.com/photo/2023/11/09/11/50/cat-8377169_960_720.jpg',
      handler : (resp: any) => {

        if(resp != null && resp.razorpay_payment_id != null) {
          this.proccessResponse(resp, orderForm);
        }else {
          alert("Payment Failed...");
        }
      },
      prefill : {
        name: 'GMM',
        email: 'abc@gmail.com',
        contact: '0753193439'
      },
      notes : {
        address : 'Sinza Dar es Salaam'
      },
      theme: '#F37254'
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  proccessResponse(response: any, orderForm: NgForm){
    this.placeOrder(orderForm);
    this.orderDetails.transactionId = response.razorpay_payment_id;
    console.log(response);
  }
}
