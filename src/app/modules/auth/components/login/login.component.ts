import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loading: boolean = false;
  passwordVisible: boolean = false;

  errMsg: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  signInWithGoogle() {
    this.loading = true;
    this.errMsg = null;
    this.authService
      .signInWithGoogle()
      .pipe(
        tap(() => {
          this.router.navigate(['gallery']);
        }),
        catchError((err) => {
          this.errMsg = err.message;
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin() {
    this.loading = true;
    this.errMsg = null;
    const { email, password } = this.loginForm.value;
    this.authService
      .logInWithEmail(email, password)
      .pipe(
        tap(() => {
          this.router.navigate(['gallery']);
        }),
        catchError((err) => {
          this.errMsg = err.message;
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
