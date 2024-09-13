import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReportDetailComponent } from './rating-report-detail.component';

describe('RatingReportDetailComponent', () => {
  let component: RatingReportDetailComponent;
  let fixture: ComponentFixture<RatingReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatingReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
