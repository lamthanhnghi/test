import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyDetailComponent } from './privacy-policy-detail.component';

describe('PrivacyPolicyDetailComponent', () => {
  let component: PrivacyPolicyDetailComponent;
  let fixture: ComponentFixture<PrivacyPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
