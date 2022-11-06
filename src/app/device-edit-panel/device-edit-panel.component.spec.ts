import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditPanelComponent } from './device-edit-panel.component';

describe('DeviceEditPanelComponent', () => {
  let component: DeviceEditPanelComponent;
  let fixture: ComponentFixture<DeviceEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceEditPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
