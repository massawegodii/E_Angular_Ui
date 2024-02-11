import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  pageNumber: number = 0;
  productDetails: Product[] = [];

  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  
  searchByKeyword(searchkeyword:any) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
  

  public getAllProducts(searchkey: string = "") {
    return this.productService
      .getAllProducts(this.pageNumber, searchkey)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);

          if(resp.length == 4){
            this.showLoadButton = true;
          }else {
            this.showLoadButton = false;
          }
          resp.forEach(p => this.productDetails.push(p));
          // this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }


  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  showProductDetails(productId: any){
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }

}
