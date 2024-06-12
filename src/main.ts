import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Function to provide the Lottie player
export function playerFactory() {
  return player;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // Use provideAnimations for BrowserAnimationsModule
    provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient
    provideLottieOptions({ player: playerFactory }), provideAnimationsAsync(), // Provide Lottie options
    // other providers here
  ]
}).catch(err => console.error(err));
