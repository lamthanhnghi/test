import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPolicyListComponent } from './program-policy-list.component';

describe('ProgramPolicyListComponent', () => {
  let component: ProgramPolicyListComponent;
  let fixture: ComponentFixture<ProgramPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramPolicyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
