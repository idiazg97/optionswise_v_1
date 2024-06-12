import { Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css'
})
export class LoadingScreenComponent {
  options = {
    path: 'assets/loadingLottie.json', // Replace this with the URL to your Lottie animation JSON file
  }

  constructor() {
  }

}
