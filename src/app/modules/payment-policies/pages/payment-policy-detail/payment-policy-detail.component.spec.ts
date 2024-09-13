import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPolicyDetailComponent } from './payment-policy-detail.component';

describe('DetailComponent', () => {
  let component: PaymentPolicyDetailComponent;
  let fixture: ComponentFixture<PaymentPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
