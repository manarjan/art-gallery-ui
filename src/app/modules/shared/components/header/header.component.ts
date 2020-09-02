import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  user$: Observable<firebase.User> = this.authService.user$;

  ngOnInit(): void {}

  onSignOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
