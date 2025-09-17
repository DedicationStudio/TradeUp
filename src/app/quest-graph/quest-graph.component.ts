import { Component, ElementRef, OnChanges, ViewChild, Input } from '@angular/core';
import { createChart, IChartApi, CandlestickData, ColorType, CandlestickSeries } from 'lightweight-charts';
import { QuestAnswerComponent } from "../quest-answer/quest-answer.component";
import { ResponsiveService } from '../responsive.service';

@Component({
    selector: 'app-quest-graph',
    imports: [QuestAnswerComponent],
    templateUrl: './quest-graph.component.html',
    styleUrl: './quest-graph.component.css',
    standalone: true
})
export class QuestGraphComponent implements OnChanges {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  private chart!: IChartApi;
  @Input() data!: CandlestickData[];

  constructor(private responsive: ResponsiveService) {}

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  graphHeight = 250;
  line: string = "#404040"
  background: string = "#222222ff"
  priceScale: boolean = true;

  ngOnChanges(): void {
    // Gestione responsive
    if (this.windowWidth < 768) {
      this.graphHeight = 300;
    }
    if (this.windowHeight <= 667) {
      this.graphHeight = 150;
    }
    if (this.windowHeight <= 884) {
      this.graphHeight = 265;
    }
    if (this.windowHeight <= 740) {
      this.graphHeight = 170;
    }

    if(this.windowWidth <= 430){
      this.line="#40404001";
      this.background = "#22222201"
      this.priceScale=false;
    }

    // Reset chart se già esiste
    if (this.chart) {
      this.chart.remove();
      this.chartContainer.nativeElement.innerHTML = '';
    }

    // Creazione chart
    this.chart = createChart(this.chartContainer.nativeElement, {
      layout: {
        textColor: '#C3BCDB',
        background: { type: ColorType.Solid, color: this.background },
      },
      grid: {
        vertLines: { color: this.line, style: 2 },
        horzLines: { color: this.line, style: 2 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      localization: {
        // Tutto in UTC
        timeFormatter: (timestamp: number) => {
          const date = new Date(timestamp * 1000); // Binance → s
          // ISO string in UTC → YYYY-MM-DD HH:mm
          return date.toISOString().slice(0, 16).replace('T', ' ');
        }
      },
      height: this.graphHeight,
      rightPriceScale: {
              visible: false
            },
            leftPriceScale: {
              visible: this.priceScale,
            }
    });

    // Serie candlestick
    const candlestickSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(this.data);
    this.chart.timeScale().fitContent();

    // Resize
    window.addEventListener('resize', () => {
      this.chart.applyOptions({ height: 200 });
    });
  }
}
