import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProduccionComponent } from './registrar-produccion.component';

describe('RegistrarProduccionComponent', () => {
  let component: RegistrarProduccionComponent;
  let fixture: ComponentFixture<RegistrarProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarProduccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
