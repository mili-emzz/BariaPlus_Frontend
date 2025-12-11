import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsLayout } from './views-layout';

describe('ViewsLayout', () => {
  let component: ViewsLayout;
  let fixture: ComponentFixture<ViewsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
