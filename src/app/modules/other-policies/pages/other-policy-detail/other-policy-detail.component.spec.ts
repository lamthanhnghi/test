import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPolicyDetailComponent } from './other-policy-detail.component';

describe('OtherPolicyDetailComponent', () => {
  let component: OtherPolicyDetailComponent;
  let fixture: ComponentFixture<OtherPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
