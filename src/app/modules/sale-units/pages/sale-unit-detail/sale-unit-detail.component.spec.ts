import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleUnitDetailComponent } from './sale-unit-detail.component';

describe('SaleUnitDetailComponent', () => {
  let component: SaleUnitDetailComponent;
  let fixture: ComponentFixture<SaleUnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleUnitDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleUnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
