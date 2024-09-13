import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusLabelComponent } from './account-status-label.component';

describe('AccountStatusLabelComponent', () => {
  let component: AccountStatusLabelComponent;
  let fixture: ComponentFixture<AccountStatusLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountStatusLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountStatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
