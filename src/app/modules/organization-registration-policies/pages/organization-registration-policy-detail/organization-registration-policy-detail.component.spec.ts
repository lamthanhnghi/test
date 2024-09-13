import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRegistrationPolicyDetailComponent } from './organization-registration-policy-detail.component';

describe('OrganizationRegistrationPolicyDetailComponent', () => {
  let component: OrganizationRegistrationPolicyDetailComponent;
  let fixture: ComponentFixture<OrganizationRegistrationPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationRegistrationPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationRegistrationPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
