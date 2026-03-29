import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.html',
  styleUrl: './overview.less',
})
export class Overview {
  protected readonly title = signal('chart');
}
