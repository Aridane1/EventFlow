import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourNotificationsPage } from './your-notifications.page';

describe('YourNotificationsPage', () => {
  let component: YourNotificationsPage;
  let fixture: ComponentFixture<YourNotificationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YourNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
