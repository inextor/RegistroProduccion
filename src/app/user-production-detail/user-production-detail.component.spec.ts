import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductionDetailComponent } from './user-production-detail.component';

describe('UserProductionDetailComponent', () => {
  let component: UserProductionDetailComponent;
  let fixture: ComponentFixture<UserProductionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProductionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProductionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
