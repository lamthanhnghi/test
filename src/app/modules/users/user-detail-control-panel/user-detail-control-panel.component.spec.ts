import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailControlPanelComponent } from './user-detail-control-panel.component';

describe('UserDetailControlPanelComponent', () => {
  let component: UserDetailControlPanelComponent;
  let fixture: ComponentFixture<UserDetailControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailControlPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
