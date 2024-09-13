import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerReportDetailComponent } from './seller-report-detail.component';

describe('SellerReportDetailComponent', () => {
  let component: SellerReportDetailComponent;
  let fixture: ComponentFixture<SellerReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
