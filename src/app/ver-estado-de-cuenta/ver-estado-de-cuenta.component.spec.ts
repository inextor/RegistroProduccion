import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstadoDeCuentaComponent } from './ver-estado-de-cuenta.component';

describe('VerEstadoDeCuentaComponent', () => {
  let component: VerEstadoDeCuentaComponent;
  let fixture: ComponentFixture<VerEstadoDeCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEstadoDeCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerEstadoDeCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
