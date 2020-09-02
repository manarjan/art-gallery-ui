import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) {}

  user$: Observable<firebase.User> = this.firebaseAuth.user;
  token$: Observable<string> = this.firebaseAuth.idToken;

  signInWithGoogle() {
    return from(
      this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    );
  }

  logInWithEmail(email: string, password: string) {
    return from(this.firebaseAuth.signInWithEmailAndPassword(email, password));
  }

  signUpWithEmail(email: string, password: string, displayName: string) {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap((credential) => {
        return credential.user.updateProfile({
          displayName,
        });
      })
    );
  }

  signOut() {
    return from(this.firebaseAuth.signOut());
  }
}
