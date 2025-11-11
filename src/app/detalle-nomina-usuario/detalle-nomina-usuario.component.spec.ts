import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNominaUsuarioComponent } from './detalle-nomina-usuario.component';

describe('DetalleNominaUsuarioComponent', () => {
  let component: DetalleNominaUsuarioComponent;
  let fixture: ComponentFixture<DetalleNominaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleNominaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleNominaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
