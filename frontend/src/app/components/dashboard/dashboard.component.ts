import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private apiService: ApiService) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
