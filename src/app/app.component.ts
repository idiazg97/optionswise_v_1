import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';
import { isPlatformBrowser } from '@angular/common';
import { WebHomeComponent } from "./web-home/web-home.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MobileHomeComponent, CommonModule, WebHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'optionswise_v_1';
  isMobile: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      this.isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);
    }
  }

}
