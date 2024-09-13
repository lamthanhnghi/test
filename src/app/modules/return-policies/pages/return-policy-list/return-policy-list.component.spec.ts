import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPolicyListComponent } from './return-policy-list.component';

describe('ListComponent', () => {
  let component: ReturnPolicyListComponent;
  let fixture: ComponentFixture<ReturnPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
