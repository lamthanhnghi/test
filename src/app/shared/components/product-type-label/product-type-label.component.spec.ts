import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeLabelComponent } from './product-type-label.component';

describe('ProductTypeLabelComponent', () => {
  let component: ProductTypeLabelComponent;
  let fixture: ComponentFixture<ProductTypeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTypeLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTypeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
