import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentStatusLabelTagComponent } from './content-status-label-tag.component';

describe('ContentStatusLabelTagComponent', () => {
  let component: ContentStatusLabelTagComponent;
  let fixture: ComponentFixture<ContentStatusLabelTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentStatusLabelTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentStatusLabelTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
