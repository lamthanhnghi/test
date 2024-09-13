import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentStatusLabelComponent } from './content-status-label.component';

describe('ContentStatusLabelComponent', () => {
  let component: ContentStatusLabelComponent;
  let fixture: ComponentFixture<ContentStatusLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentStatusLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentStatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
