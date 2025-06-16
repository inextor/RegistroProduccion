import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionByGroupComponent } from './production-by-group.component';

describe('ProductionByGroupComponent', () => {
  let component: ProductionByGroupComponent;
  let fixture: ComponentFixture<ProductionByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionByGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
