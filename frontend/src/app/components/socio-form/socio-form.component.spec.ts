import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SocioFormComponent } from './socio-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SocioFormComponent', () => {
  let component: SocioFormComponent;
  let fixture: ComponentFixture<SocioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocioFormComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});