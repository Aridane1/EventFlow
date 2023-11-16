import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeAdministratorPage } from './see-administrator.page';

describe('SeeAdministratorPage', () => {
  let component: SeeAdministratorPage;
  let fixture: ComponentFixture<SeeAdministratorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeeAdministratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
