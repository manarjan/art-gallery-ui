import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  exhaustMap,
  scan,
  startWith,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { ViewMode } from '../../../models/mode.model';
import { Photos } from '../../../models/photo.model';
import { PhotoService } from '../../../services/photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryComponent implements OnInit {
  constructor(private photoService: PhotoService) {}

  search: FormControl = new FormControl();

  photos$: Observable<Photos>;
  onSearch$: Subject<string> = new Subject();
  onPageEvent$: Subject<string> = new Subject();

  pageSize: number = 12;
  viewMode: ViewMode = ViewMode.GRID;

  //Enum
  ViewMode = ViewMode;

  ngOnInit(): void {
    this.photos$ = this.onSearch$.pipe(
      startWith(''),
      switchMap((filter: string) => {
        let currentPage = 0;
        return this.onPageEvent$.pipe(
          startWith(0),
          tap(() => {
            currentPage++;
          }),
          exhaustMap(() => {
            return this.photoService.getPhotos(currentPage, 12, filter);
          }),
          takeWhile((photos: Photos) => {
            return photos.data.length === this.pageSize;
          }, true),
          scan(
            (allPhotos: Photos, newPhotos: Photos) => {
              return {
                total: allPhotos.total,
                data: [...allPhotos.data, ...newPhotos.data],
              };
            },
            { total: 0, data: [] }
          )
        );
      })
    );
  }

  onSearch() {
    this.onSearch$.next(this.search.value);
  }

  nextPage() {
    this.onPageEvent$.next();
  }
}
