import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss']
})
export class SigninDialogComponent implements OnInit {
  form: FormGroup;
  authSub: Subscription;
  userId: string;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        console.log('Теперь вы можете войти в систему используя свои данные');
      } else if (params.accessDenied) {
        console.log('Авторизуйтесь в системе');
      } else if (params.sessionFaled) {
        console.log('Ваша сессия закончилась, пожалуйста зайдите заново');
      }
    });
  }

}
