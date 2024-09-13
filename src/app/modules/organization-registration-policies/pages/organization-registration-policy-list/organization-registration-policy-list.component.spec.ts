import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRegistrationPolicyListComponent } from './organization-registration-policy-list.component';

describe('OrganizationRegistrationPolicyListComponent', () => {
  let component: OrganizationRegistrationPolicyListComponent;
  let fixture: ComponentFixture<OrganizationRegistrationPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationRegistrationPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationRegistrationPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
