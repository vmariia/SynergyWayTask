import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl: string = 'assets/product.json'

  totalCount = new Subject();

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.productUrl);
  }

}
