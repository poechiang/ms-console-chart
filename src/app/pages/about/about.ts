import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-about',
  imports: [NzButtonModule, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.less',
})
export class About {
  protected readonly title = signal('chart');
}
