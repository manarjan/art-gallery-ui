import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { FavouritesService } from '../services/favourites.service';

@Injectable()
export class FavouritesResolver implements Resolve<Photo[]> {
  constructor(private favouritesService: FavouritesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Photo[]> {
    return this.favouritesService.getFavourites();
  }
}
