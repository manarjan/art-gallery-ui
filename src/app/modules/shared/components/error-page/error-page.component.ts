import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private location: Location) {}

  errorMsg: string = this.route.snapshot.data['message'];
  icon: string = this.route.snapshot.data['icon'];

  ngOnInit(): void {}

  onBack() {
    this.location.back();
  }
}
