import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';


import { BaseChartDirective } from 'ng2-charts';  // ✅ solo questo
import { CommonModule } from '@angular/common';
import { LevelsService } from '../levels.service';

// registrazione necessaria
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, BaseChartDirective], // ✅ qui importi la direttiva
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    standalone: true
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input({ required: true }) idUser!: string;

  // Dati utente
  learning: string = "crypto";
  streak: number = 0;
  coin: number = 540;
  hearts: number = 5;
  money: number = 100;
  position: number = 10;
  username: string = "pixelman";

  // Storico e percentuali
  money_history: {money: number, date: string}[] = [];
  percent: number = 0;
  show_percent: string = "";

  // Missioni
  missions = [
    { progress: "25%", description: "Do the Manual level without Error", emoji: "book" },
    { progress: "100%", description: "Do a Streak of 7 days", emoji: "joystick" },
    { progress: "50%", description: "Get in one day More then 5%", emoji: "candlestick_chart" }
  ];

  // Config Chart.js
lineChartData: ChartData<'line'> = {
  labels: [],
  datasets: [
    {
      data: [],
      borderColor: '#FFC400',
      backgroundColor: '', // sovrascritto dal gradient
      borderWidth: 3,
      tension: 0,       // 0 = linee dritte
      pointRadius: 0,   // niente pallini sui punti
      fill: true        // abilita il riempimento sotto la linea
    }
  ]
};

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#37464F',
          font: {
            size: 14,
            weight: 'bolder',
            family: "arial"
          },
          padding: 10,
        },
        grid: { color: 'rgba(255, 255, 255, 0)' },
        border: { display: false }
      },
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0)' },
        grid: { color: 'rgba(255, 255, 255, 0)' },
        border: { display: false },
        min: 0
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: (context) => {
            const x = context.label;
            const y = context.parsed.y;
            return `X: ${x} - Y: ${y}`;
          }
        }
      }
    }
  };

  constructor(private levelService: LevelsService) {}

  ngOnInit(): void {

    this.levelService.getUserById(this.idUser).subscribe((data: any) => {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let lastPlayed: Date = new Date(data.lastPlayed._seconds * 1000);

      this.streak=data.streak;
      if (
        yesterday.getFullYear() === lastPlayed.getFullYear() &&
        yesterday.getMonth() === lastPlayed.getMonth() &&
        yesterday.getDate() === lastPlayed.getDate()
      )
       {
        this.streak++
        this.levelService.updateUserStreak(this.idUser,this.streak).subscribe();
        this.levelService.updateUserLastPlayed(this.idUser).subscribe();
      } else if((now.getFullYear() === lastPlayed.getFullYear() &&
        now.getMonth() === lastPlayed.getMonth() &&
        now.getDate() === lastPlayed.getDate())){

      }else {
        this.streak=0;
        this.levelService.updateUserStreak(this.idUser,1).subscribe();
        this.levelService.updateUserLastPlayed(this.idUser).subscribe();
      }
    });




    this.levelService.getUserById(this.idUser).subscribe((data: any) => {
      
      
      
      
      this.money = data.money[data.money.length-1].money;
      this.coin=data.gems;

      // aggiorna lo storico
      this.money_history = [

      ];
      if(data.money.length>=4){
        for (let i = data.money.length - 4; i < data.money.length ; i++) {
          let date = new Date(data.money[i].date._seconds * 1000);
          let day   = date.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'Europe/Rome' });
          let month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'Europe/Rome' });


            this.money_history.push({
              money: data.money[i].money,
              date: day+ " "+ month
            });

        }

      }else{
        for (let i = 0; i < data.money.length ; i++) {
          let date: Date = new Date(data.money[i].date._seconds * 1000);
          let day   = date.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'Europe/Rome' });
          let month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'Europe/Rome' });

            this.money_history.push({
              money: data.money[i].money,
              date: day+ " "+ month
            });

        }
      }
      
      if (this.money_history.length === 1) {
  // prendo la stringa tipo "7 September"
  const oldDateStr = this.money_history[0].date;

  // la converto in oggetto Date usando il locale en-GB (gg mese anno)
  const oldDate = new Date(oldDateStr + " " + new Date().getFullYear());

  // sottraggo un giorno
  oldDate.setDate(oldDate.getDate() - 1);

  // formatto la nuova data come "6 September"
  const newDateStr = oldDate.getDate() + " " +
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(oldDate);

  // pusho all’inizio dell’array
  this.money_history.unshift({
    money: this.money_history[0].money,
    date: newDateStr
  });
}
      console.log("-------------------------",this.money_history)


      // percentuale
      this.percent =
        ((this.money - this.money_history[this.money_history.length - 2].money) /
          this.money_history[this.money_history.length - 2].money) * 100;

      this.show_percent = (this.percent > 0 ? '+' : '') + this.percent.toFixed(2);

      // aggiorna grafico
      this.lineChartData.labels = this.money_history.slice(-4).map(item => item.date);
      this.lineChartData.datasets[0].data = this.money_history.slice(-4).map(item => item.money);

      // gradient dopo render
      setTimeout(() => this.updateGradient(), 0);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateGradient(), 0);
  }

updateGradient(): void {
  if (!this.chart?.chart) return;
  const ctx = this.chart.chart.ctx;
  const chartArea = this.chart.chart.chartArea;
  if (!ctx || !chartArea) return;

  // Gradiente verticale dall'alto al basso
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, 'rgba(255, 196, 0, 0.3)');  // giallo semi-trasparente
  gradient.addColorStop(1, 'rgba(255, 196, 0, 0)');    // trasparente

  this.lineChartData.datasets[0].backgroundColor = gradient;
  this.chart.update();
}
}
