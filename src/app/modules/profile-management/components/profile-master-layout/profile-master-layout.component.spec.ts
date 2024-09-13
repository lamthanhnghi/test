import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMasterLayoutComponent } from './profile-master-layout.component';

describe('ProfileMasterLayoutComponent', () => {
  let component: ProfileMasterLayoutComponent;
  let fixture: ComponentFixture<ProfileMasterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileMasterLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMasterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
