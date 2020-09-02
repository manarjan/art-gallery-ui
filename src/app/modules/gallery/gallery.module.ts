import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { PhotosComponent } from './components/photos/photos.component';
import { FavouritesComponent } from './components/screens/favourites/favourites.component';
import { PhotoGalleryComponent } from './components/screens/photo-gallery/photo-gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { PhotoService } from './services/photo.service';
import { FavouritesService } from './services/favourites.service';

@NgModule({
  declarations: [
    PhotoCardComponent,
    PhotoGalleryComponent,
    FavouritesComponent,
    PhotosComponent,
  ],
  imports: [SharedModule, GalleryRoutingModule],
  providers: [PhotoService, FavouritesService],
})
export class GalleryModule {}
