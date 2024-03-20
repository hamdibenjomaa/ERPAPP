import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Retrieve user profile
    return this.userService.getUserProfile().pipe(
      map((userProfile: any) => {
        // Extract the desired route from the state URL
        const desiredRoute = state.url.split('/')[1]; // Extracts the first segment of the URL

        // Redirect users based on their roles
        switch (userProfile.role) {
          case 'SuperAdmin':
            if (desiredRoute !== 'Admin') {
              return this.router.createUrlTree(['/Admin']);
            }
            break;
          case 'admin':
            if (desiredRoute !== 'AdminCompany') {
              return this.router.createUrlTree(['/AdminCompany']);
            }
            break;
          case 'salesManager':
            if (desiredRoute !== 'Sales') {
              return this.router.createUrlTree(['/Sales']);
            }
            break;
          case 'stockManager':
            if (desiredRoute !== 'Stock') {
              return this.router.createUrlTree(['/Stock']);
            }
            break;
          case 'auditor':
            if (desiredRoute !== 'Audit') {
              return this.router.createUrlTree(['/Audit']);
            }
            break;
          default:
            // If user role doesn't match any predefined roles, redirect to login page
            return this.router.createUrlTree(['/login']);
        }

        // Allow access if the desired route matches the user's role
        return true;
      })
    );
  }
}

/*
canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // Extract the current route URL
      const currentRoute = this.router.url;

      // Allow access to specific routes unconditionally
      if (
        currentRoute.includes('/login') ||
        currentRoute.includes('/forgot-password') ||
        currentRoute.includes('/reset-password')
      ) {
        resolve(true); // Allow access to login, forgot password, reset password routes
      } else {
        // For other routes, check authentication and user role
        if (this.userService.isAuthenticated()) {
          // Get user profile to fetch user role
          this.userService.getUserProfile().subscribe(
            (userProfile: any) => {
              const currentUserRole = userProfile.role;

              // Check if the route matches the user's role
              switch (true) {
                case currentUserRole === 'admin' && currentRoute.includes('/AdminCompany'):
                  resolve(true);
                  break;
                case currentUserRole === 'SuperAdmin' && currentRoute.includes('/Admin'):
                  resolve(true);
                  break;
                case currentUserRole === 'salesManager' && currentRoute.includes('/Sales'):
                  resolve(true);
                  break;
                case currentUserRole === 'stockManager' && currentRoute.includes('/Stock'):
                  resolve(true);
                  break;
                case currentUserRole === 'auditor' && currentRoute.includes('/Audit'):
                  resolve(true);
                  break;
                default:
                  // Redirect to the current route for unauthorized access
                  this.router.navigateByUrl(currentRoute);
                  resolve(false);
                  break;
              }
            },
            (error: any) => {
              console.error('Error fetching user profile:', error);
              // Redirect to login page if user profile cannot be fetched
              this.router.navigate(['/login']);
              resolve(false);
            }
          );
        } else {
          // Redirect to login page if user is not authenticated
          this.router.navigate(['/login']);
          resolve(false);
        }
      }
    });
  }
*/ 