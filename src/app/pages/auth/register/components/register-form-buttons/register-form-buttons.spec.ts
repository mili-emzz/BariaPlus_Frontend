import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormButtons } from './register-form-buttons';

describe('RegisterFormButtons', () => {
  let component: RegisterFormButtons;
  let fixture: ComponentFixture<RegisterFormButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
