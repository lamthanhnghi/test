import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPolicyDetailComponent } from './inspection-policy-detail.component';

describe('DetailComponent', () => {
  let component: InspectionPolicyDetailComponent;
  let fixture: ComponentFixture<InspectionPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
