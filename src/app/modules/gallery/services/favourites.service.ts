import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Favourites } from '../models/favourite.model';
import { Photo } from '../models/photo.model';

@Injectable()
export class FavouritesService {
  constructor(private http: HttpClient) {}

  favourites$: BehaviorSubject<Favourites> = new BehaviorSubject({});

  getFavourites() {
    return this.http.get<Photo[]>(environment.api.gallery.favourites).pipe(
      tap((photos) => {
        this.favourites$.next(
          photos.reduce((photos, photo) => {
            photos[photo.id] = photo;
            return photos;
          }, {})
        );
      })
    );
  }

  addToFavourites(photo: Photo) {
    return this.http
      .post<Photo>(environment.api.gallery.favourites, photo)
      .pipe(
        tap((photo) => {
          this.favourites$.next({
            ...this.favourites$.value,
            [photo.id]: photo,
          });
        })
      );
  }

  removeFromFavourites(photo: Photo) {
    return this.http
      .delete(`${environment.api.gallery.favourites}/${photo.id}`)
      .pipe(
        tap(() => {
          const { [photo.id]: deleted, ...rest } = this.favourites$.value;
          this.favourites$.next(rest);
        })
      );
  }
}
