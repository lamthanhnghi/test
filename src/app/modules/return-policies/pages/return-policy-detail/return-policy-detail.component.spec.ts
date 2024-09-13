import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPolicyDetailComponent } from './return-policy-detail.component';

describe('DetailComponent', () => {
  let component: ReturnPolicyDetailComponent;
  let fixture: ComponentFixture<ReturnPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
