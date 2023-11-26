import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeModePage } from './change-mode.page';

describe('ChangeModePage', () => {
  let component: ChangeModePage;
  let fixture: ComponentFixture<ChangeModePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangeModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
