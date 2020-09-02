import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photos } from '../models/photo.model';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhotos(page: number, per_page: number, query?: string) {
    return this.http.get<Photos>(environment.api.gallery.photos, {
      params: {
        page: page.toString(),
        per_page: per_page.toString(),
        query,
      },
    });
  }
}
