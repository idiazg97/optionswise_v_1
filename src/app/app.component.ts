import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MobileHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'optionswise_v_1';
}
