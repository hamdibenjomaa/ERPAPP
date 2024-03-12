// updateorder.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-updateorder',
  templateUrl: './updateorder.component.html',
  styleUrls: ['./updateorder.component.css']
})
export class UpdateorderComponent implements OnInit {

  orderForm: FormGroup;
  orderId: string = '';

  constructor(private fb: FormBuilder, private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    this.orderForm = this.fb.group({
      totalPrice: ['', Validators.required],
      status: ['', Validators.required],
      // Add other form controls as needed
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrder();
    });
  }

  loadOrder() {
    this.orderService.getOrderById(this.orderId).subscribe(
      order => {
        this.orderForm.patchValue(order);
      },
      error => {
        console.error('Failed to load order:', error);
      }
    );
  }

  get totalPriceControl() {
    return this.orderForm.get('totalPrice');
  }

  get statusControl() {
    return this.orderForm.get('status');
  }

  updateOrder() {
    if (this.orderForm.valid) {
      const updateOrderData = this.orderForm.value;
      this.orderService.updateOrder(this.orderId, updateOrderData).subscribe(
        updatedOrder => {
          console.log('Order updated successfully!', updatedOrder);
          this.router.navigate(['/Admin/listorder']);
          // Navigate back to the list of orders or perform other actions
        },
        error => {
          console.error('Failed to update order:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
