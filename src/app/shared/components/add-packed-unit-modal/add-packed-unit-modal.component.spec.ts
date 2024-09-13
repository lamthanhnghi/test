import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackedUnitComponent } from './add-packed-unit-modal.component';

describe('AddPackedUnitComponent', () => {
  let component: AddPackedUnitComponent;
  let fixture: ComponentFixture<AddPackedUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPackedUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPackedUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
