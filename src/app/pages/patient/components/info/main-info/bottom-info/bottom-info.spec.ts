import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomInfo } from './bottom-info';

describe('BottomInfo', () => {
  let component: BottomInfo;
  let fixture: ComponentFixture<BottomInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
