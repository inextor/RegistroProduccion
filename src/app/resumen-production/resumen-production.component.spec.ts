import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProductionComponent } from './resumen-production.component';

describe('ResumenProductionComponent', () => {
  let component: ResumenProductionComponent;
  let fixture: ComponentFixture<ResumenProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenProductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
