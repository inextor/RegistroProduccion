import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProduccionCategoryComponent } from './resumen-produccion-category.component';

describe('ResumenProduccionCategoryComponent', () => {
  let component: ResumenProduccionCategoryComponent;
  let fixture: ComponentFixture<ResumenProduccionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenProduccionCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenProduccionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
