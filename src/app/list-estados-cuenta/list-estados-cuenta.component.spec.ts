import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstadosCuentaComponent } from './list-estados-cuenta.component';

describe('ListEstadosCuentaComponent', () => {
  let component: ListEstadosCuentaComponent;
  let fixture: ComponentFixture<ListEstadosCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEstadosCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEstadosCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
