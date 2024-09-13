import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingUnitListComponent } from './packing-unit-list.component';

describe('PackingUnitListComponent', () => {
  let component: PackingUnitListComponent;
  let fixture: ComponentFixture<PackingUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackingUnitListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackingUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
