import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSigninDialogComponent } from './signup-signin-dialog.component';

describe('SignupSigninDialogComponent', () => {
  let component: SignupSigninDialogComponent;
  let fixture: ComponentFixture<SignupSigninDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSigninDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSigninDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
