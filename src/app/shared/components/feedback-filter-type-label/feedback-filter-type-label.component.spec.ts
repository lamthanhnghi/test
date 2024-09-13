import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFilterTypeLabelComponent } from './feedback-filter-type-label.component';

describe('FeedbackFilterTypeLabelComponent', () => {
  let component: FeedbackFilterTypeLabelComponent;
  let fixture: ComponentFixture<FeedbackFilterTypeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackFilterTypeLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackFilterTypeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
