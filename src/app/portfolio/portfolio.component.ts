import { Component, ElementRef, Input, input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { TradingData } from '../trading-data/trading-data.module';
import { AreaData, AreaSeries, CandlestickData, CandlestickSeries, ColorType, createChart, IChartApi } from 'lightweight-charts';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LevelsService } from '../levels.service';
import { LoadingComponent } from '../loading/loading.component';
import Typed from 'typed.js';
import { RiveCanvas, RiveLinearAnimation, RiveModule, RiveStateMachine } from 'ng-rive';
import { QuestAnswerComponent } from '../quest-answer/quest-answer.component';


@Component({
    selector: 'app-portfolio',
    imports: [RouterLink, RiveCanvas, RiveStateMachine, RiveModule, QuestAnswerComponent],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css',
    standalone: true
})
export class PortfolioComponent implements OnInit, OnChanges{
  @ViewChildren('chartContainer') chartContainer!: QueryList<ElementRef>;
  @ViewChild('Title', { static: true }) Title!: ElementRef;

  private chart!: IChartApi;
  locales = ['es-ES', 'en-US', 'ja-JP'];
  candles: any[] = [];
  tradingData!: TradingData[];
  quest!: number;
  symbol!:string;
  start!:number;
  end!:number;
  result!:number;
  answer!:string;
  typed!:Typed;
  
  constructor(private data: DataService, private http: HttpClient,private router: Router) {}
  
  ngOnInit(): void {
    this.typed = new Typed(this.Title.nativeElement, {
    strings: ['HARD STUFF...^700','HARD STUFF TO LEARN EASLY^1000','A New Guide For Everyone^1000', 'Free EVERYTIME...^500','Free EVERYTIME For EVERYBODY^1000'],
    smartBackspace: true, // Default value
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
  });
  this.getData(false)

  this.createGraph();
    

  }

  setLocale(locale: string): void {
    this.chart.applyOptions({
      localization: {
        locale: locale,
        dateFormat: locale === 'ja-JP' ? 'yyyy-MM-dd' : "dd MMM 'yy",
      },
    });


  }

  ngOnChanges(changes: SimpleChanges): void {
       }
  getData(lastDate: boolean){
    this.http.get<TradingData[]>('../../assets/data.json')
      .subscribe(data => {
        this.tradingData = data;
        if(!lastDate){
          this.quest = Math.floor(Math.random()* this.tradingData.length);

        }
        this.symbol = this.tradingData[this.quest].symbol;
        this.start = new Date(this.tradingData[this.quest].start).getTime();
        this.end = new Date(this.tradingData[this.quest].end).getTime();
        this.result = new Date(this.tradingData[this.quest].result).getTime();
        this.answer = this.tradingData[this.quest].answer;

        if(!lastDate){

          this.data.getCandlestickData(this.symbol, this.start, this.end).subscribe(data => {
            this.candles = data;
            this.createGraph();
          });
        }else{
          this.data.getCandlestickData(this.symbol, this.start, this.result).subscribe(data => {
            this.candles = data;
            this.createGraph();
            });
        }

      });



  }

  
createGraph(){
  console.log(this.chartContainer)
  this.chartContainer.forEach((container, index) => {


    
    
        this.chart = createChart(container.nativeElement, {
            layout: {
                textColor: '#C3BCDB',
                background: { type: ColorType.Solid, color: '#22222201' },
              },
              grid: {
                vertLines: { color: '#40404001', style: 2 },
                horzLines: { color: '#40404001', style: 2 },
              },
              timeScale: {
                timeVisible: true,       // mostra ora e minuti
                secondsVisible: false    // no secondi
              },
        localization: {
            timeFormatter: (timestamp: number) => {
              const date = new Date(timestamp * 1000); // timestamp in secondi
              return date.toLocaleString('en-US', {
                weekday: 'short', // Thu
                day: '2-digit',   // 11
                month: 'short',   // Apr
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              });
            
            }
          },
          
          height: 300,

            rightPriceScale: {
              visible: false
            },
            leftPriceScale: {
              visible: true,
            }
        });

        

          const areaSeries = this.chart.addSeries(AreaSeries, {
            topColor: '#2d2148ff',
            bottomColor: '#2d214827',
            lineColor: '#0000000c',
            lineWidth: 2
          });
    
          const candlestickSeries = this.chart.addSeries(CandlestickSeries, {
            upColor: '#2962FF',
            downColor: '#D32F2F',
            borderUpColor: '#2962FF',
            borderDownColor: '#D32F2F',
            wickUpColor: '#2962FF',
            wickDownColor: '#D32F2F',
          });
    
        const dataStick: CandlestickData[] = this.candles;
        const dataArea: AreaData[] = this.candles.map(candle => ({
            time: candle.time,
            value: candle.close // serve un numero, non open/high/low
        }));
        console.log(dataArea)
        
        areaSeries.setData(dataArea);
        candlestickSeries.setData(dataStick);
        this.chart.timeScale().fitContent();
    
        window.addEventListener('resize', () => {
          this.chart.applyOptions({ height: 200 });
        });
      });
}


}
