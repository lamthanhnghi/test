import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackedUnitDetailComponent } from './packed-unit-detail.component';

describe('PackedUnitDetailComponent', () => {
  let component: PackedUnitDetailComponent;
  let fixture: ComponentFixture<PackedUnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackedUnitDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackedUnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
