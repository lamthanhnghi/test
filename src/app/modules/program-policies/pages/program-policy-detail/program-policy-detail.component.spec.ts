import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPolicyDetailComponent } from './program-policy-detail.component';

describe('ProgramPolicyDetailComponent', () => {
  let component: ProgramPolicyDetailComponent;
  let fixture: ComponentFixture<ProgramPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramPolicyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
