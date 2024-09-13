import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackedUnitListComponent } from './packed-unit-list.component';

describe('PackedUnitListComponent', () => {
  let component: PackedUnitListComponent;
  let fixture: ComponentFixture<PackedUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackedUnitListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackedUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
