import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EmpresaFormComponent implements OnInit {
  empresa: any = { nome: '' };
  id: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.apiService.getEmpresa(this.id).subscribe(data => {
        this.empresa = data;
      });
    }
  }

  navigateTo(router: string): void {
    this.router.navigate([router]);
  }

  saveEmpresa(): void {
    if (this.id) {
      this.apiService.updateEmpresa(this.id, this.empresa).subscribe(() => {
        this.router.navigate(['/empresa']);
      });
    } else {
      this.apiService.createEmpresa(this.empresa).subscribe(() => {
        this.router.navigate(['/empresa']);
      });
    }
  }
}