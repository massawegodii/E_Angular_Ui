import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImageDialogueComponent } from './../show-product-image-dialogue/show-product-image-dialogue.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css',
})
export class ShowProductDetailsComponent implements OnInit {

  showTable = false;
  pageNumber: number = 0;
  showLoadButton = false;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discount Price', 'Poduct Actual Price', 'Actions'];


  constructor(private productService: ProductService,
    public imagesDialogue: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  
  searchByKeyword(searchkeyword: any) {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchkey: string = "") {
    this.showTable = false;
    return this.productService.getAllProducts(this.pageNumber, searchkey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        // console.log(resp);
        if(resp.length == 4){
          this.showLoadButton = true;
        }else{
          this.showLoadButton = false;
        }
        resp.forEach(product => this.productDetails.push(product));
        this.showTable = true;
        console.log(this.productDetails);
        //  this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  public LoadingMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId: any) {

    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
  
    if (isConfirmed) {
      this.productService.deleteProduct(productId).subscribe(
        (response) => {
          this.getAllProducts();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      // User cancelled the deletion
      console.log('Deletion canceled by the user.');
    }
  }

  showImage(product: Product) {
    console.log(product);
    this.imagesDialogue.open(ShowProductImageDialogueComponent, {
      data: {
        image: product.productImages
      },
      height: '400px',
      width: '600px'
    });
  }

  editProductDetails(productId: any){
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }


  
}
