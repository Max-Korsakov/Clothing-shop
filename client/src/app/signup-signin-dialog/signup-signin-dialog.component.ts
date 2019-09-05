import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-signup-signin-dialog',
  templateUrl: './signup-signin-dialog.component.html',
  styleUrls: ['./signup-signin-dialog.component.scss']
})
export class SignupSigninDialogComponent implements OnInit {
  form: FormGroup;
  authSub: Subscription;
  userId: string;
  constructor(
    public dialogRef: MatDialogRef<SignupSigninDialogComponent>,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public signUpMode = false;

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  onSubmit() {
    this.dialogRef.close({
      isSignUp: this.signUpMode,
      formValue: this.form.value
    });
  }

  getErrorMessage() {
    return this.form.hasError('required') ? 'You must enter a value' :
        this.form.value.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}
