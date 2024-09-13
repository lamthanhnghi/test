import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportInfoComponent } from './product-report-info.component';

describe('ProductReportInfoComponent', () => {
  let component: ProductReportInfoComponent;
  let fixture: ComponentFixture<ProductReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductReportInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductReportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
