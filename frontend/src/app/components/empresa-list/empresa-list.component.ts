import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EmpresaListComponent implements OnInit {
  empresas: any[] = [];

  constructor(private apiService: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.apiService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  deleteEmpresa(id: number): void {
    this.apiService.deleteEmpresa(id).subscribe(() => {
      this.empresas = this.empresas.filter(empresa => empresa.id !== id);
    });
  }
}