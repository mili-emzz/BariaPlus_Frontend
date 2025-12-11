import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInfo } from './top-info';

describe('TopInfo', () => {
  let component: TopInfo;
  let fixture: ComponentFixture<TopInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
