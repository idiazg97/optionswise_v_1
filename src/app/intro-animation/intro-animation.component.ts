import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, Input, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Candlestick } from '../mobile-home/mobile-home.component';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-intro-animation',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './intro-animation.component.html',
  styleUrls: ['./intro-animation.component.css'],
  animations: [
    trigger('scan', [
      state('one', style({ width: '{{startWidth}}px' }), { params: { startWidth: 0 } }),
      state('two', style({ width: '2%', opacity: '1' })),
      state('three', style({ width: '0%', opacity: '0' })),
      transition('one => two', [
        animate('4s', keyframes([
          style({ width: '{{startWidth}}px' }),
          style({ width: '2%' })
        ]))
      ]),
      transition('two => three', [
        animate('1s', keyframes([
          style({ width: '0%', opacity: '1' }),
          style({ width: '0%', opacity: '0' })
        ]))
      ])
    ]),
    trigger('fade', [
      state('solid', style({ opacity: '1' })),
      state('faded', style({ opacity: '0' })),
      transition('solid => faded', [
        animate('1s', keyframes([
          style({ opacity: '1' }),
          style({ opacity: '0' })
        ]))
      ]),
    ]),
    trigger('pulse', [
      state('static', style({transform: 'scale(1)'})),
      state('pulsing', style({transform: 'scale(1)'})),
      state('wiggle', style({transform: 'rotateZ(0)'})),
      transition('static =>  pulsing', [
        animate('14s', keyframes([
          style({transform: 'scale(1)'}),
          style({transform: 'scale(1.25)'}),
          style({transform: 'scale(1)'}),
          style({transform: 'scale(1.25)'}),
          style({transform: 'scale(1)'}),
          style({transform: 'scale(1.25)'}),
          style({transform: 'scale(1)'})
        ]))
      ]),
      transition('pulsing => wiggling', [
        animate('2s', keyframes([
          style({transform: 'rotateZ(0)'}),
          style({transform: 'rotateZ(-15deg)'}),
          style({transform: 'rotateZ(10deg)'}),
          style({transform: 'rotateZ(-10deg)'}),
          style({transform: 'rotateZ(6deg)'}),
          style({transform: 'rotateZ(-4deg)'}),
          style({transform: 'rotateZ(0deg)'}),
        ]))
      ]),
    ]),
    trigger('popOut', [
      state('hidden', style({opacity: 0})),
      state('appeared', style({opacity: 1})),
      transition('hidden =>  appeared', [
        animate('3s', keyframes([
          style({opacity: 0, transform: "scale(0) translateY(100%)"}),
          style({opacity: 1, transform: 'scale(1) translateY(0%)'})
        ]))
      ]),
    ]),
    trigger('newsAppear', [
      state('hidden', style({opacity: '0'})),
      state('appeared', style({opacity: '1'})),
      transition('hidden =>  appeared', [
        animate('2s', keyframes([
          style({opacity: '0'}),
          style({opacity: '1'})
        ]))
      ]),
      transition('appeared => hidden', [
        animate('1s', keyframes([
          style({opacity: '1'}),
          style({opacity: '0'})
        ]))
      ]),
    ]),
    trigger('newsScan', [
      state('one', style({height: '1%', opacity: '0'})),
      state('two', style({height: '{{startHeight}}px', opacity: '0'}), {params: {startHeight: 0}}),
      transition('one =>  two', [
        animate('4s', keyframes([
          style({height: '1%', opacity: '1'}),
          style({height: '{{startHeight}}px', opacity: '1'})
        ]))
      ], {params: {startHeight: 0}}),
      transition('two =>  one', [
        animate('1s', keyframes([
          style({height: '{{startHeight}}px', opacity: '1'}),
          style({height: '{{startHeight}}px', opacity: '0'})
        ]))
      ], {params: {startHeight: 0}}),
    ]),
    trigger('fundamentalsAppear', [
      state('hidden', style({opacity: '0'})),
      state('appeared', style({opacity: '1'})),
      transition('hidden =>  appeared', [
        animate('2s', keyframes([
          style({opacity: '0'}),
          style({opacity: '1'})
        ]))
      ]),
      transition('appeared => hidden', [
        animate('1s', keyframes([
          style({opacity: '1'}),
          style({opacity: '0'})
        ]))
      ]),
    ]),
    trigger('fundamentalsScan', [
      state('one', style({height: '1%', opacity: '0'})),
      state('two', style({height: '{{startHeight}}px', opacity: '0'}), {params: {startHeight: 0}}),
      transition('one =>  two', [
        animate('4s', keyframes([
          style({height: '1%', opacity: '1'}),
          style({height: '{{startHeight}}px' ,opacity: '1'})
        ]))
      ], {params: {startHeight: 0}}),
      transition('two =>  one', [
        animate('1s', keyframes([
          style({height: '{{startHeight}}px', opacity: '1'}),
          style({height: '{{startHeight}}px', opacity: '0'})
        ]))
      ], {params: {startHeight: 0}}),
    ]),
  ]
})
export class IntroAnimationComponent implements OnInit, AfterViewInit {
  @Input() candlesticks: Candlestick[] = [];
  scanState = 'one';
  fadeState = 'solid';
  pulseState = 'static';
  newsAppearState = 'hidden';
  newsScanState = 'one';
  fundamentalsAppearState = 'hidden';
  fundamentalsScanState = 'one';
  popstate = 'hidden';
  currentPrice: any;
  windowWidth: any;
  candleSticksCount: number = 0;

  @ViewChild('chart') chartElement?: ElementRef;
  @ViewChild('scannerView') scannerViewElement?: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {
    if (isPlatformBrowser(platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    console.log(this.candlesticks.length)
    if (this.candlesticks) {
      this.candleSticksCount = this.candlesticks.length;
      this.currentPrice = this.candlesticks[this.candleSticksCount-1].close
      if (this.candleSticksCount > 0) {
        this.startAnimations();
      }
    }
  }

  ngAfterViewInit(): void {}

  startAnimations() {
    if (isPlatformBrowser(this.platformId)) {
      const chartWidth = this.chartElement?.nativeElement.offsetWidth;

        setTimeout(()=> {
          this.scanState = 'two';
          this.pulseState = 'pulsing';
        }, 500)

        setTimeout(()=> {
          this.scanState = 'three';
          this.fadeState = 'faded';
          this.newsAppearState = 'appeared';
        }, 4500)

        setTimeout(() => {
          this.newsScanState = 'two'
        }, 5500)

        setTimeout(() => {
          this.newsAppearState = 'hidden'
          this.newsScanState = 'one'
        }, 9500)

        setTimeout(() => {
          this.fundamentalsAppearState = 'appeared'
          this.fundamentalsScanState = 'two'
        }, 10500)
    
        setTimeout(() => {
          this.fundamentalsAppearState = 'hidden'
          this.fundamentalsScanState = 'one'
        }, 14500)

        setTimeout(() => {
          this.pulseState = 'wiggling'
        }, 15000)

        setTimeout(() => {
          this.popstate = 'appeared'
        }, 16500)
    }
  }

  onFadeAnimationEnd() {
    this.newsScanState = 'two';

    this.renderer.listen(this.scannerViewElement?.nativeElement, 'animationend', (event: AnimationEvent) => {
      if (event.animationName === 'newsScan') {
        this.onNewsScanAnimationEnd();
      }
    });
  }

  onNewsScanAnimationEnd() {
    this.newsAppearState = 'hidden';
    this.newsScanState = 'one';

    this.renderer.listen(this.scannerViewElement?.nativeElement, 'animationend', (event: AnimationEvent) => {
      if (event.animationName === 'fundamentalsAppear') {
        this.onFundamentalsAppearAnimationEnd();
      }
    });
  }

  onFundamentalsAppearAnimationEnd() {
    this.fundamentalsAppearState = 'appeared';
    this.fundamentalsScanState = 'two';

    this.renderer.listen(this.scannerViewElement?.nativeElement, 'animationend', (event: AnimationEvent) => {
      if (event.animationName === 'fundamentalsScan') {
        this.onFundamentalsScanAnimationEnd();
      }
    });
  }

  onFundamentalsScanAnimationEnd() {
    this.fundamentalsAppearState = 'hidden';
    this.fundamentalsScanState = 'one';
    this.pulseState = 'wiggling';

    this.renderer.listen(this.scannerViewElement?.nativeElement, 'animationend', (event: AnimationEvent) => {
      if (event.animationName === 'popOut') {
        this.onPopOutAnimationEnd();
      }
    });
  }

  onPopOutAnimationEnd() {
    this.popstate = 'appeared';
  }

  generateBollingerBandPath(data: any, chartWidth: any, chartHeight: any) {
    // Determine the x scale based on the number of data points and the width of the chart
    const xScale = chartWidth / (data.length - 1);
  
    // Generate the path for the upper band
    const upperPathD = data.map((item: any, index: any) => {
      if (item["BBU_5_2.0"] != null) {
        const x = index * xScale;
        const yUpper = this.yScale(item["BBU_5_2.0"], chartHeight);
        return `${x},${yUpper}`;
      }
      return null;
    }).filter((point: any) => point != null).join(' L');
  
    // Generate the path for the lower band
    const lowerPathD = data.map((item: any, index: any) => {
      if (item["BBL_5_2.0"] != null) {
        const x = index * xScale;
        const yLower = this.yScale(item["BBL_5_2.0"], chartHeight);
        return `${x},${yLower}`;
      }
      return null;
    }).filter((point: any) => point != null).reverse().join(' L');
  
    // Combine the paths for a closed shape
    const pathD = `M${upperPathD} L${lowerPathD}`;
    return pathD;
  }

  generateBollingerBandMiddlePath(data: any,chartWidth: any, chartHeight: any) {
    const xScale = chartWidth / (data.length - 1);
    // Generate the path for the middle band using map, filter out null values, then join
    const middlePathD = data.map((item: any, index: number) => {
      if (item["BBM_5_2.0"] != null) {
        const x = index * xScale; // Adjust based on your chart's scaling
        const yMiddle = this.yScale(item["BBM_5_2.0"], chartHeight);
        return `${x},${yMiddle}`;
      }
      return null;
    }).filter((point:any) => point != null).join(' L');
  
    // Return the path for the middle band
    return `M ${middlePathD}`;
  }
  

  yScale(value: number, chartHeight: number): number {
    // Get all high prices from candlesticks
    const highPrices = this.candlesticks.map(c => c.high);
    // Get all low prices from candlesticks
    const lowPrices = this.candlesticks.map(c => c.low);
    // Get all upper Bollinger Band values
    const upperBandValues = this.candlesticks.map(c => c["BBU_5_2.0"]).filter(v => v != null);
    // Get all lower Bollinger Band values
    const lowerBandValues = this.candlesticks.map(c => c["BBL_5_2.0"]).filter(v => v != null);
  
    // Combine all values to find the absolute max and min for the entire chart
    const allValues = highPrices.concat(lowPrices, upperBandValues, lowerBandValues);
    const maxPrice = Math.max(...allValues);
    const minPrice = Math.min(...allValues);
  
    // Calculate the yScale based on the max and min values
    const scale = (maxPrice - value) / (maxPrice - minPrice);
    return scale * chartHeight;
  }

  getMax(one: number, two: number) {
    let max = Math.max(one, two)
    return max
  }

  getAbs(num: number) {
    return Math.abs(num)
  }

}
