import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFormRowComponent } from './read-only-form-row.component';

describe('ReadOnlyFormRowComponent', () => {
  let component: ReadOnlyFormRowComponent;
  let fixture: ComponentFixture<ReadOnlyFormRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFormRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadOnlyFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
