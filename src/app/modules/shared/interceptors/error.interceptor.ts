import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, mergeMap, finalize, retryWhen } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        if (
          retryAttempt > maxRetryAttempts ||
          excludedStatusCodes.includes(+error.status)
        ) {
          return throwError(error);
        }
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => {})
    );
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(
        this.genericRetryStrategy({
          scalingDuration: 100,
          excludedStatusCodes: [500, 502, 401, 403, 404, 400],
        })
      ),
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this.router.navigate(['login']);
            break;
          case 404:
            this.router.navigate(['not-found']);
            break;
          case 502:
          case 503:
            this.router.navigate(['unavailable']);
            break;
          default:
            this.router.navigate(['oops']);
        }
        return throwError(err);
      })
    );
  }
}
