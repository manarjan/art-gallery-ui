import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Favourites } from '../../../models/favourite.model';
import { Photo } from '../../../models/photo.model';
import { FavouritesService } from '../../../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent implements OnInit {
  constructor(private favService: FavouritesService) {}

  favourites$: Observable<Photo[]> = this.favService.favourites$.pipe(
    map((favs) => Object.values(favs))
  );

  ngOnInit(): void {}
}
