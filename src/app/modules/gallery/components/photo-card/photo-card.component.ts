import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewMode } from '../../models/mode.model';
import { Photo } from '../../models/photo.model';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardComponent implements OnInit, OnChanges {
  constructor(
    private favService: FavouritesService,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() photo: Photo;
  @Input() mode: ViewMode;

  liked$: Observable<boolean>;

  //enum
  ViewMode = ViewMode;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photo && changes.photo.currentValue) {
      // Not very performant
      this.liked$ = this.favService.favourites$.pipe(
        map((photos) => {
          if (photos[this.photo.id]) {
            this.photo.liked_by_user = true;
            return true;
          } else {
            this.photo.liked_by_user = false;
            return false;
          }
        })
      );
    }
  }

  toggleFav(event: MouseEvent, photo: Photo) {
    event.stopPropagation();
    if (photo.liked_by_user) {
      this.favService.removeFromFavourites(photo).subscribe(() => {
        this.photo.liked_by_user = false;
        this.cdr.detectChanges();
      });
    } else {
      this.favService.addToFavourites(photo).subscribe(() => {
        this.photo.liked_by_user = true;
        this.cdr.detectChanges();
      });
    }
  }
}
