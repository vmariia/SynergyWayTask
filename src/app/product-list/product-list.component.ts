import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products;
  cartProduct = [];
  cartProducts = [];
  productCount: number = 1;
  totalCount;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  addToCart(storageValue) {
    let currentID = storageValue.id;
    const products = JSON.parse(localStorage.getItem('products'));
    const cart = products && products.length > 0 ? products : [];
    const product = cart.find(item => item.id === currentID);
    
    let newCart = [];
    if (product) {
      newCart = cart.map( item => 
        item.id === product.id ? {
          ...item,
          count: item.count + this.productCount
        } : item
      );
    } else {
      newCart = [...cart, {...storageValue, count: this.productCount}];
    }

    this.productCount = 1;
    localStorage.setItem('products', JSON.stringify(newCart));

    this.updateTotalCount();
  }

  updateTotalCount() {
    let updateProduct = JSON.parse(localStorage.getItem('products'));

    let totalCount = updateProduct.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
    this.productService.totalCount.next(totalCount);
  }

  increament(product) {
    this.productCount = product.count += 1;
  }

  decreament(product) {
    if (product.count > 1) {
      this.productCount = product.count -= 1;
    }
  }

}
