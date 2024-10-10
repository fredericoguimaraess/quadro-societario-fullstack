import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  login(): void {
    console.log("Tentando fazer login...");
    this.apiService.login(this.email, this.password).subscribe(response => {
      console.log("Resposta do servidor:", response);
      if (response.token) {
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      console.error("Erro ao fazer login:", error);
      this.errorMessage = "Erro ao fazer login. Por favor, tente novamente.";
    });
  }
}
