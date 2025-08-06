import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarNominaAlternoComponent } from './generar-nomina-alterno.component';

describe('GenerarNominaAlternoComponent', () => {
  let component: GenerarNominaAlternoComponent;
  let fixture: ComponentFixture<GenerarNominaAlternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarNominaAlternoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarNominaAlternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
