import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '../shared/components/container/container.component';
import { FavouritesComponent } from './components/screens/favourites/favourites.component';
import { PhotoGalleryComponent } from './components/screens/photo-gallery/photo-gallery.component';
import { FavouritesResolver } from './resolvers/favourites.resolver';
const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    resolve: {
      favourites: FavouritesResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'browse',
      },
      {
        path: 'browse',
        component: PhotoGalleryComponent,
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FavouritesResolver],
})
export class GalleryRoutingModule {}
