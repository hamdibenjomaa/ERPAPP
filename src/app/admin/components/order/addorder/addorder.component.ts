// addorder.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent {

  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router) {
    this.orderForm = this.fb.group({
      totalPrice: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  get totalPriceControl() {
    return this.orderForm.get('totalPrice');
  }

  get statusControl() {
    return this.orderForm.get('status');
  }

  addOrder() {
    console.log('addOrder method called');

    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      this.orderService.addOrder(orderData).subscribe(
        newOrder => {
          console.log('Order added successfully!', newOrder);
          // Navigate back to the list of orders
          this.router.navigate(['/Admin/listorder']);
        },
        error => {
          console.error('Failed to add order:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
