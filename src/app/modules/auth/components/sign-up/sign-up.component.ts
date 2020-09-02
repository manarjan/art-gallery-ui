import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loading: boolean = false;
  passwordVisible: boolean = false;

  errMsg: string;

  signUpForm: FormGroup = new FormGroup({
    displayName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

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

  onSignUp() {
    this.loading = true;
    this.errMsg = null;
    const { email, password, displayName } = this.signUpForm.value;
    this.authService
      .signUpWithEmail(email, password, displayName)
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
