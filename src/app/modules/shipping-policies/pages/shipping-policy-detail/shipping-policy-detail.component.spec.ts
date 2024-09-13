import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPolicyDetailComponent } from './shipping-policy-detail.component';

describe('DetailComponent', () => {
  let component: ShippingPolicyDetailComponent;
  let fixture: ComponentFixture<ShippingPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
