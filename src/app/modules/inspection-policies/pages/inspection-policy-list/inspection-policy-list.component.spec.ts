import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPolicyListComponent } from './inspection-policy-list.component';

describe('ListComponent', () => {
  let component: InspectionPolicyListComponent;
  let fixture: ComponentFixture<InspectionPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
