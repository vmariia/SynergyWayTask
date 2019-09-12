import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts = [];
  generalPrice: number;
  productCount: number;
  totalCount;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(localStorage.getItem('products'));
    if (this.cartProducts) {
      this.generalPrice = this.cartProducts.reduce((sum, item) => sum + item.price * item.count, 0);
    }
  }

  removeFromCart(product) {
    const products = this.cartProducts.filter(item => item.id !== product.id);
    this.setLocalStorage(products);
    this.generalPrice = this.generalPrice - product.price * product.count;
    this.cartProducts = JSON.parse(localStorage.getItem('products'));

    let totalCount = this.cartProducts.reduce((sum, item) => sum + item.count, 0);
    this.productService.totalCount.next(totalCount);

  }

  increament(product) {
    this.productCount = product.count += 1;
    const products = JSON.parse(localStorage.getItem('products'));
    let updateProducts = products.map( item => item.id === product.id ? {...item, count: this.productCount } : item );   
    this.generalPrice += product.price;

    this.setLocalStorage(updateProducts);
    
    let totalCount = products.reduce((sum, item) => sum + item.count, 1);
    this.productService.totalCount.next(totalCount);
  }

  decreament(product) {
    if ( product.count > 1 ) {
      this.productCount = product.count -= 1;
      this.generalPrice -= product.price;
      const products = JSON.parse(localStorage.getItem('products'));
      let updateProducts = products.map( item => item.id === product.id ? {...item, count: this.productCount } : item );   

      this.setLocalStorage(updateProducts); 
      
      let totalCount = products.reduce((sum, item) => sum + item.count, -1);
      this.productService.totalCount.next(totalCount);
    }
  }

  setLocalStorage(product) {
    localStorage.setItem('products', JSON.stringify(product));
  }

}
