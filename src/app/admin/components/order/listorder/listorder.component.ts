// listorder.component.ts

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders;
        console.log('Orders loaded successfully!', this.orders);
      },
      error => {
        console.error('Failed to load orders:', error);
      }
    );
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        console.log('Order deleted successfully!');
        // You may want to refresh the list or perform other actions after deletion
        this.loadOrders();
      },
      error => {
        console.error('Failed to delete order:', error);
      }
    );
  }

  updateOrder(orderId: string) {
    this.router.navigate(['/Admin/updateorder', orderId]);
  }
}
