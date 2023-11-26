import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeEventPage } from './see-event.page';

describe('SeeEventPage', () => {
  let component: SeeEventPage;
  let fixture: ComponentFixture<SeeEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeeEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
