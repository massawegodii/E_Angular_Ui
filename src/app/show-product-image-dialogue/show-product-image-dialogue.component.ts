import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-product-image-dialogue',
  templateUrl: './show-product-image-dialogue.component.html',
  styleUrl: './show-product-image-dialogue.component.css',
})
export class ShowProductImageDialogueComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log(this.data);
  }
}
