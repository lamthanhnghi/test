import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingUnitListComponent } from './selling-unit-list.component';

describe('SellingUnitListComponent', () => {
  let component: SellingUnitListComponent;
  let fixture: ComponentFixture<SellingUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellingUnitListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellingUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
