import { Photo } from './photo.model';

export interface Favourites {
  [id: string]: Photo;
}
