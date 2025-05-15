import { Component, OnInit } from '@angular/core';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { IntroAnimationComponent } from '../intro-animation/intro-animation.component';
import { HeaderComponent } from '../header/header.component';
import { StockServiceService } from '../services/stock-service.service';
import { PhoneNumber, SignUpInputComponent } from '../sign-up-input/sign-up-input.component';
import { CommonModule } from '@angular/common';
import { SmsVerificationComponent } from '../sms-verification/sms-verification.component';


export interface Candlestick {
  "BBB_5_2.0": number,
  "BBL_5_2.0": number,
  "BBM_5_2.0": number,
  "BBP_5_2.0": number,
  "BBU_5_2.0": number,
  "SMA_20": number,
  "close": number,
  "high": number,
  "low": number,
  "open": number,
  "timestamp": number,
  "volume": number
}

@Component({
  selector: 'app-mobile-home',
  standalone: true,
  imports: [LoadingScreenComponent, CommonModule, IntroAnimationComponent, HeaderComponent, SignUpInputComponent,SmsVerificationComponent],
  templateUrl: './mobile-home.component.html',
  styleUrl: './mobile-home.component.css'
})
export class MobileHomeComponent implements OnInit {
  loading: boolean = true
  public candlesticks: any
  phoneNumber: string = ''
  currentPrice: any
  popUp: boolean = false
  signedUp: boolean = false

  constructor(private stockService: StockServiceService) {
  }

  ngOnInit(): void {
    const data = this.stockService.getTickerData('TSLA')
    data.subscribe((resp => {
      this.candlesticks = resp.filter((candle: Candlestick) => candle.SMA_20 != null)
      this.currentPrice = Number(resp[resp.length-1].close).toFixed(2)
      this.loading = false
    }))
  }

  getlength() {
    if (this.candlesticks) {
      return this.candlesticks.length > 1 ? true : false
    }
    else {
      return false
    }
   }
   
   setPopup($event: any) {
    if ($event.number) {
      this.phoneNumber = $event.number.replace(' ', '')
      this.popUp = $event.status
      console.log("Submitted", this.phoneNumber)
    } else {
      this.signedUp = $event.smsVerified
      this.popUp = $event.popUpClose
      console.log("SIGNED UP", $event.smsVerified, $event.popUpClose)
    }
  }
}
