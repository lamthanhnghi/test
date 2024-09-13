import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTypeLabelComponent } from './program-type-label.component';

describe('ProgramTypeLabelComponent', () => {
  let component: ProgramTypeLabelComponent;
  let fixture: ComponentFixture<ProgramTypeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramTypeLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramTypeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
