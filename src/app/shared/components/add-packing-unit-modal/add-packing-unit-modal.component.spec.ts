import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackingUnitModalComponent } from './add-packing-unit-modal.component';

describe('AddPackingUnitModalComponent', () => {
  let component: AddPackingUnitModalComponent;
  let fixture: ComponentFixture<AddPackingUnitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPackingUnitModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPackingUnitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
