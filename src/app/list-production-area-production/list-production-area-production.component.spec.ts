import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductionAreaProductionComponent } from './list-production-area-production.component';

describe('ListProductionAreaProductionComponent', () => {
  let component: ListProductionAreaProductionComponent;
  let fixture: ComponentFixture<ListProductionAreaProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductionAreaProductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductionAreaProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
