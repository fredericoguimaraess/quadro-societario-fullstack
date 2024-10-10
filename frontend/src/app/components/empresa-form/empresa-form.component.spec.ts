import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmpresaFormComponent } from './empresa-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EmpresaFormComponent', () => {
  let component: EmpresaFormComponent;
  let fixture: ComponentFixture<EmpresaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpresaFormComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});