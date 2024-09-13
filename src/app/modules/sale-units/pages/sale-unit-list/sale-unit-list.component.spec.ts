import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleUnitListComponent } from './sale-unit-list.component';

describe('SaleUnitListComponent', () => {
  let component: SaleUnitListComponent;
  let fixture: ComponentFixture<SaleUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleUnitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
