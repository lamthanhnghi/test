import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReportDetailComponent } from './message-report-detail.component';

describe('MessageReportDetailComponent', () => {
  let component: MessageReportDetailComponent;
  let fixture: ComponentFixture<MessageReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
