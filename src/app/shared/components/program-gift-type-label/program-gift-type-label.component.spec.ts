import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramGiftTypeLabelComponent } from './program-gift-type-label.component';

describe('ProgramGiftTypeLabelComponent', () => {
  let component: ProgramGiftTypeLabelComponent;
  let fixture: ComponentFixture<ProgramGiftTypeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramGiftTypeLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramGiftTypeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
