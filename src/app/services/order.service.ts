// order.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000'; // Replace with your NestJS backend URL

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/${orderId}`);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/orders/${orderId}`);
  }

  addOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders`, orderData);
  }

  updateOrder(orderId: string, updateOrderData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/orders/${orderId}`, updateOrderData);
  }
}
