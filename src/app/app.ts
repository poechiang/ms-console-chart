import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useFrameEvent } from '@core/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  #configSrv = inject(NzConfigService);
  #events = useFrameEvent();

  constructor() {
    this.#events?.on('theme:change', (key, coloring) =>
      this.#configSrv.set('theme', {
        primaryColor: coloring,
        bodyBackground: 'red',
      }),
    );
  }
}
