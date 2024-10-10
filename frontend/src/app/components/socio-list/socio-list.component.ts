import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socio-list',
  templateUrl: './socio-list.component.html',
  styleUrls: ['./socio-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SocioListComponent implements OnInit {
  socios: any[] = [];

  constructor(private apiService: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.apiService.getSocios().subscribe(data => {
      this.socios = data;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  deleteSocio(id: number): void {
    this.apiService.deleteSocio(id).subscribe(() => {
      this.socios = this.socios.filter(socio => socio.id !== id);
    });
  }
}