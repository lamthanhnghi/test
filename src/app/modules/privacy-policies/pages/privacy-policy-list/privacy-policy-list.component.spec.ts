import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyListComponent } from './privacy-policy-list.component';

describe('PrivacyPolicyListComponent', () => {
  let component: PrivacyPolicyListComponent;
  let fixture: ComponentFixture<PrivacyPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
