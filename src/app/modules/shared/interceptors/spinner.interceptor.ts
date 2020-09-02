import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { StateService } from '../services/state.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private httpRequests: HttpRequest<any>[] = [];

  constructor(private stateService: StateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.httpRequests.push(req);
    return next.handle(req).pipe(
      tap((resp) => {
        if (!this.stateService.isLoading) {
          this.stateService.isLoading = true;
        }
      }),
      finalize(() => {
        this.removeRequest(req);
      })
    );
  }

  private removeRequest(req: HttpRequest<any>) {
    const i = this.httpRequests.indexOf(req);
    if (i >= 0) {
      this.httpRequests.splice(i, 1);
    }
    if (this.httpRequests.length <= 0) {
      this.stateService.isLoading = false;
    }
  }
}
