import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.apiService.isAuthenticated();

    if (isAuthenticated && state.url === '/login') {
      this.router.navigate(['/dashboard']);
      return false;
    } else if (!isAuthenticated && state.url !== '/login') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
