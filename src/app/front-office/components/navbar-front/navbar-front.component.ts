import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-front',
  templateUrl: './navbar-front.component.html',
  styleUrl: './navbar-front.component.css'
})
export class NavbarFrontComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onStartClicked() {
    // Check if the user is authenticated
    if (this.userService.isAuthenticated()) {
      // Redirect to the dashboard
      this.router.navigate(['/Admin']);
    } else {
      // If not authenticated, proceed with the regular login/signup route
      this.router.navigate(['/login']);
    }
  }
}