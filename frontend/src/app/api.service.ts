import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login_check`, { email, password }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getEmpresas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresa`, { headers: this.getHeaders() });
  }

  getEmpresa(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresa/${id}`, { headers: this.getHeaders() });
  }

  createEmpresa(empresa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empresa/`, empresa, { headers: this.getHeaders() });
  }

  updateEmpresa(id: number, empresa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/empresa/${id}`, empresa, { headers: this.getHeaders() });
  }

  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empresa/${id}`, { headers: this.getHeaders() });
  }

  getSocios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/socio`, { headers: this.getHeaders() });
  }

  getSocio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/socio/${id}`, { headers: this.getHeaders() });
  }

  createSocio(socio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/socio/`, socio, { headers: this.getHeaders() });
  }

  updateSocio(id: number, socio: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/socio/${id}`, socio, { headers: this.getHeaders() });
  }

  deleteSocio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/socio/${id}`, { headers: this.getHeaders() });
  }
}
