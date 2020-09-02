import { Component } from '@angular/core';
import { StateService } from './modules/shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public stateService: StateService) {}
}
