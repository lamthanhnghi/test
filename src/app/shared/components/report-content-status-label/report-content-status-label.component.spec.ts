import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportContentStatusLabelComponent } from './report-content-status-label.component';

describe('ReportContentStatusLabelComponent', () => {
  let component: ReportContentStatusLabelComponent;
  let fixture: ComponentFixture<ReportContentStatusLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportContentStatusLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportContentStatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
