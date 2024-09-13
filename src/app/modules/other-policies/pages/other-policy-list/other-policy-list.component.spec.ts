import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPolicyListComponent } from './other-policy-list.component';

describe('OtherPolicyListComponent', () => {
  let component: OtherPolicyListComponent;
  let fixture: ComponentFixture<OtherPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
