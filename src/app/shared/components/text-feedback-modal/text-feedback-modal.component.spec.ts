import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFeedbackModalComponent } from './text-feedback-modal.component';

describe('TextFeedbackModalComponent', () => {
  let component: TextFeedbackModalComponent;
  let fixture: ComponentFixture<TextFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFeedbackModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
