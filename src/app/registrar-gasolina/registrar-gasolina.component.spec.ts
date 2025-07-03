import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGasolinaComponent } from './registrar-gasolina.component';

describe('RegistrarGasolinaComponent', () => {
  let component: RegistrarGasolinaComponent;
  let fixture: ComponentFixture<RegistrarGasolinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarGasolinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarGasolinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
