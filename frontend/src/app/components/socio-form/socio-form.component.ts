import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-socio-form',
  templateUrl: './socio-form.component.html',
  styleUrls: ['./socio-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SocioFormComponent implements OnInit {
  socio: any = { nome: '', empresa: null };
  empresas: any[] = [];
  id: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.apiService.getSocio(this.id).subscribe(data => {
        this.socio = data;
      });
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
  saveSocio(): void {
    if (this.id) {
      this.apiService.updateSocio(this.id, this.socio).subscribe(() => {
        this.router.navigate(['/socio']);
      });
    } else {
      this.apiService.createSocio(this.socio).subscribe(() => {
        this.router.navigate(['/socio']);
      });
    }
  }
}