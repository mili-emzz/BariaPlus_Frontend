import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormFooter } from './register-form-footer';

describe('RegisterFormFooter', () => {
  let component: RegisterFormFooter;
  let fixture: ComponentFixture<RegisterFormFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
