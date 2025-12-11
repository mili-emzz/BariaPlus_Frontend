import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInfo } from './main-info';

describe('MainInfo', () => {
  let component: MainInfo;
  let fixture: ComponentFixture<MainInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
