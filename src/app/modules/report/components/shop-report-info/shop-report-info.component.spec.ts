import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReportInfoComponent } from './shop-report-info.component';

describe('ShopReportInfoComponent', () => {
  let component: ShopReportInfoComponent;
  let fixture: ComponentFixture<ShopReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopReportInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopReportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
