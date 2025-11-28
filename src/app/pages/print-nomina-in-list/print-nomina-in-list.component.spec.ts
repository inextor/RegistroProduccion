import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintNominaInListComponent } from './print-nomina-in-list.component';

describe('PrintNominaInListComponent', () => {
  let component: PrintNominaInListComponent;
  let fixture: ComponentFixture<PrintNominaInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintNominaInListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintNominaInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
