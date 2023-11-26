import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourEventsPage } from './your-events.page';

describe('YourEventsPage', () => {
  let component: YourEventsPage;
  let fixture: ComponentFixture<YourEventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YourEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
