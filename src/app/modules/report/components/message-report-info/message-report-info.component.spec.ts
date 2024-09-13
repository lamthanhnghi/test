import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReportInfoComponent } from './message-report-info.component';

describe('MessageReportInfoComponent', () => {
  let component: MessageReportInfoComponent;
  let fixture: ComponentFixture<MessageReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageReportInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageReportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
