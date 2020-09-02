import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';
import { ErrorPageComponent } from './modules/shared/components/error-page/error-page.component';
import { HomeComponent } from './modules/shared/components/home/home.component';
import { WelcomeComponent } from './modules/shared/components/welcome/welcome.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToGallery = () => redirectLoggedInTo(['gallery']);

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path: 'gallery',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/gallery/gallery.module').then(
            (m) => m.GalleryModule
          ),
      },
    ],
  },
  {
    path: 'access-denied',
    data: {
      message: 'Access Denied',
      icon: 'access',
    },
    component: ErrorPageComponent,
  },
  {
    path: 'oops',
    data: {
      message: 'Oops! Unknown Error occurred',
      icon: 'error',
    },
    component: ErrorPageComponent,
  },
  {
    path: 'unavailable',
    data: {
      message: 'Service Unavailable',
      icon: '503',
    },
    component: ErrorPageComponent,
  },
  {
    path: '**',
    data: {
      message: 'Resource/Page not found',
      icon: '404',
    },
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
