import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalCount = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    let cartProducts = JSON.parse(localStorage.getItem('products'));
    if (cartProducts) {
      this.totalCount = cartProducts.reduce(function(sum, item) {
        return sum + item.count;
      }, 0);
    }
    this.productService.totalCount.subscribe( data => this.totalCount = +data );
  }

}
