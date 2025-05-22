import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProduccion2Component } from './registrar-produccion2.component';

describe('RegistrarProduccion2Component', () => {
  let component: RegistrarProduccion2Component;
  let fixture: ComponentFixture<RegistrarProduccion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarProduccion2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarProduccion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
