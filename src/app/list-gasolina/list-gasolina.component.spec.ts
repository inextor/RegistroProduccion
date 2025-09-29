import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGasolinaComponent } from './list-gasolina.component';

describe('ListGasolinaComponent', () => {
  let component: ListGasolinaComponent;
  let fixture: ComponentFixture<ListGasolinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGasolinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGasolinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
