import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../external/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InViewportModule } from 'ng-in-viewport';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ContainerComponent } from './components/container/container.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SpinnerComponent,
    WelcomeComponent,
    ErrorPageComponent,
    ContainerComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InViewportModule,
    SpinnerComponent,
    WelcomeComponent,
    ErrorPageComponent,
    ContainerComponent,
  ],
})
export class SharedModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'error',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/error.svg')
    );
    iconRegistry.addSvgIcon(
      '503',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/503.svg')
    );
    iconRegistry.addSvgIcon(
      '404',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/404.svg')
    );
    iconRegistry.addSvgIcon(
      'access',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/access.svg')
    );
    iconRegistry.addSvgIcon(
      'login',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/login.svg')
    );
    iconRegistry.addSvgIcon(
      'sign-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/sign-up.svg')
    );
    iconRegistry.addSvgIcon(
      'art_museum',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/art_museum.svg')
    );
    iconRegistry.addSvgIcon(
      'online_gallery',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/online_gallery.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'void',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/void.svg')
    );
  }
}
