import { Component, OnInit } from '@angular/core';
import { ProduitServiceService } from '../../../../Services/produit-service.service';
import { Product } from '../../../../../models/Produit.model';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
 
   
  
  constructor(private produitService: ProduitServiceService){}
  ngOnInit(): void {
    this.getProducts();
    
  }
  getProducts(): void {
    this.produitService.getProducts()
      .subscribe(products => this.products = products);
  }

}
