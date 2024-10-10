import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SocioListComponent } from './socio-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SocioListComponent', () => {
  let component: SocioListComponent;
  let fixture: ComponentFixture<SocioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocioListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});