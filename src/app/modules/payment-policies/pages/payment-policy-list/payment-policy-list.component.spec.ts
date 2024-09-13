import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPolicyListComponent } from './payment-policy-list.component';

describe('ListComponent', () => {
  let component: PaymentPolicyListComponent;
  let fixture: ComponentFixture<PaymentPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
