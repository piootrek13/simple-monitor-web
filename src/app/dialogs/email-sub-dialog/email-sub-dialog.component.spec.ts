import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubDialogComponent } from './email-sub-dialog.component';

describe('EmailSubDialogComponent', () => {
  let component: EmailSubDialogComponent;
  let fixture: ComponentFixture<EmailSubDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSubDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
