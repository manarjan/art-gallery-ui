import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Photo } from '../../models/photo.model';
import { FavouritesService } from '../../services/favourites.service';
import { ViewMode } from '../../models/mode.model';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private favService: FavouritesService
  ) {}

  @Input('photos') photos: Photo[];
  @Input('mode') mode: ViewMode;

  @Output() nextPage: EventEmitter<null> = new EventEmitter();

  galleryPanelOpen: boolean = false;

  selectedPhoto: Photo;

  //enum
  ViewMode = ViewMode;

  ngOnInit(): void {}

  onIntersection(event) {
    this.nextPage.emit();
  }

  toggleGallery() {
    this.galleryPanelOpen = !this.galleryPanelOpen;
    this.cdr.detectChanges();
  }

  openCarousel(photo: Photo) {
    if (this.favService.favourites$.value[photo.id]) {
      photo.liked_by_user = true;
    }
    this.selectedPhoto = photo;
    this.toggleGallery();
  }

  onKeydownEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.toggleGallery();
    }
  }

  toggleFav(photo: Photo) {
    if (photo.liked_by_user) {
      this.favService.removeFromFavourites(photo).subscribe(() => {
        this.selectedPhoto.liked_by_user = false;
        this.cdr.detectChanges();
      });
    } else {
      this.favService.addToFavourites(photo).subscribe(() => {
        this.selectedPhoto.liked_by_user = true;
        this.cdr.detectChanges();
      });
    }
  }
}
