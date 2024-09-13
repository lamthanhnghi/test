import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPolicyListComponent } from './shipping-policy-list.component';

describe('ListComponent', () => {
  let component: ShippingPolicyListComponent;
  let fixture: ComponentFixture<ShippingPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
