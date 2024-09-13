import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailMasterLayoutComponent } from './item-detail-master-layout.component';

describe('ItemDetailMasterLayoutComponent', () => {
  let component: ItemDetailMasterLayoutComponent;
  let fixture: ComponentFixture<ItemDetailMasterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDetailMasterLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailMasterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
