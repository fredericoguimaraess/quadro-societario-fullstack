import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmpresaListComponent } from './empresa-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmpresaListComponent', () => {
  let component: EmpresaListComponent;
  let fixture: ComponentFixture<EmpresaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpresaListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});