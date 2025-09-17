import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { QuestGraphComponent } from "../quest-graph/quest-graph.component";
import { QuestAnswerComponent } from "../quest-answer/quest-answer.component";
import { PuppetsComponent } from "../puppets/puppets.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { TradingData } from '../trading-data/trading-data.module';
import { CandlestickData } from 'lightweight-charts';
import { NextQuestComponent } from "../next-quest/next-quest.component";
import { catchError, last, Observable, throwError } from 'rxjs';
import { ResponsiveService } from '../responsive.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExplanationComponent } from "../explanation/explanation.component";
import { QuestOptionComponent } from '../quest-option/quest-option.component';
import { LevelsService } from '../levels.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
    selector: 'app-quest-form',
    imports: [NgClass, HttpClientModule, QuestGraphComponent, QuestAnswerComponent, PuppetsComponent, NextQuestComponent, RouterLink, ExplanationComponent, QuestOptionComponent, LoadingComponent],
    templateUrl: './quest-form.component.html',
    styleUrl: './quest-form.component.css',
    providers: [DataService],
    standalone: true
})
export class QuestFormComponent implements OnChanges, OnInit{
  health = 5;
  motion:number = 0;
  candles: any[] = [];
  tradingData!: TradingData[];
  quest!: number;
  symbol!:string;
  start!:number;
  end!:number;
  result!:number;
  answer!:string;
  progress: number = 0;
  type: string = "";
  click: boolean = false;
  check: boolean[] = [];
  correct: boolean[] = [];
  options: [string, boolean][] = [];
  idMission: number = 0;
  idAnswer: number = 0;
  arrayidMission:number = 0;
  tagExcercise: String[] = [];
  @Input({required: true}) levelId! :number
  @Input({ required: true }) missionTag!: string;
  @Input({required: true}) idUser!: string;
  tagMission: string[] = [];
  allMissions: any[] = []
  explanation: string = "";
  title: string = "";
  description: string = "";
  short: string = "";
  loading: boolean = true;
  lastDate: boolean = false;
  money: number = 0;
  difference:string = "";

  constructor(private data: DataService, private http: HttpClient, private levelsService: LevelsService,private router: Router) {}

  answerRecived(event: string){

    if(this.health>0 && this.motion==0 && this.progress <100){
      if(this.answer == event){
          this.motion = 1;
          this.progress += 10;
          this.money = parseFloat((this.money * ((100 + Number(this.difference)) / 100)).toFixed(2));
      } else {
          this.motion = 2;
          this.health--;
          this.money = parseFloat((this.money * ((100 - Number(this.difference)) / 100)).toFixed(2));
      }

      this.getData(false)
      console.log(this.money)
    }
    
  }

  continue(event: number){
    this.loading=true;
    console.log(this.levelId)

    console.log("progresso -----------", this.progress)

    if(this.progress >= 100){
      this.levelsService.updateUserMoney(this.idUser, this.money).subscribe((data):any =>{});

        this.levelsService.updatePhase(this.idUser, this.levelId.toString(), "success").subscribe((data:any) => {
          this.levelsService.getStatus(this.idUser, this.levelId.toString()).subscribe((data:any) => {
            if (data.phase.indexOf(null) == -1) {
            const successCount = data.phase.filter((p:string) => p === 'success').length;
            const failedCount = data.phase.filter((p:string) => p === 'failed').length;
          
            const finalStatus = successCount > failedCount ? 'success' : 'failed';
          
            this.levelsService.updateStatus(this.idUser, this.levelId.toString(), finalStatus)
              .subscribe((data) => {
                // eventualmente fai qualcosa dopo l'aggiornamento
      this.loading = false;
          });
            }
          });

        });
        
        this.router.navigate(['/level-review/', this.idUser]);
    }

    if(this.health==0){
      this.levelsService.updateUserMoney(this.idUser, this.money).subscribe();
      this.levelsService.updatePhase(this.idUser, this.levelId.toString(), "failed").subscribe((data) => {
        this.levelsService.getStatus(this.idUser, this.levelId.toString()).subscribe((data:any) => {
          if (data.phase.indexOf(null) == -1) {
            const successCount = data.phase.filter((p:string) => p === 'success').length;
            const failedCount = data.phase.filter((p:string) => p === 'failed').length;
          
            const finalStatus = successCount > failedCount ? 'success' : 'failed';
          
            this.levelsService.updateStatus(this.idUser, this.levelId.toString(), finalStatus)
              .subscribe((data) => {
                // eventualmente fai qualcosa dopo l'aggiornamento
              });
            }
        });

      });
      
      this.router.navigate(['/level-review/', this.idUser]);
    }
    
    this.motion=event;    
    this.arrayidMission = Math.floor(Math.random() * this.allMissions.length)
    this.getDataMission();

  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getDataMission();
      
  }


  getDataMission(){
    this.lastDate=false;
    this.check = [];
    this.correct = [];
    this.options = [];
    this.tagExcercise = [];
    this.explanation = "";
    
    this.levelsService.getAllMissions(this.tagMission).subscribe((data)=>{
      console.log(data)
      this.allMissions = data;
      this.arrayidMission = Math.floor(Math.random() * this.allMissions.length);
      this.type = this.allMissions[this.arrayidMission].type;
      this.explanation = this.allMissions[this.arrayidMission].question;
      this.tagExcercise = this.allMissions[this.arrayidMission].tag;
      this.idMission = this.allMissions[this.arrayidMission].id;
      this.idAnswer = this.allMissions[this.arrayidMission].id_explanation;
      if(this.type=="question"){
      this.levelsService.getOptions(this.idMission).subscribe((data) => {
        data.forEach((element:any) => {
          this.options.push([element.description, element.answer]);
          this.check.push(false);
          this.correct.push(false);
        });
      });
    }else{
      this.symbol = data[this.arrayidMission].symbol;
      this.start = new Date(data[this.arrayidMission].start).getTime();
      this.end = new Date(data[this.arrayidMission].end).getTime();
      this.result = new Date(data[this.arrayidMission].result).getTime();
      this.answer = data[this.arrayidMission].answer;
      this.difference=data[this.arrayidMission].difference;
      this.getData(true);

    }

      this.levelsService.getAnswer(this.idAnswer.toString()).subscribe((data)=>{
        console.log(data);
        this.title = data[0].title;
        this.description = data[0].long;
        this.short = data[0].short;

        console.log(this.title, " ", this.description, " ", this.short);

        setTimeout(() => {
      this.loading = false;
    }, 500);
      })
    })
    
    
    
    
  }


  ngOnInit(): void {
    this.levelsService.getUserById(this.idUser).subscribe((data: any) =>{
      this.money=data.money[data.money.length-1].money;
    })

    if (this.missionTag) {
      this.tagMission = this.missionTag.split(',');
      console.log("array tag:", this.tagMission);
    } else {
      console.warn("missionTag is undefined");
    }


    this.getDataMission();
      
    
  }

    

  

  getData(lastDate: boolean){
if(lastDate){
      this.data.getCandlestickData(this.symbol, this.start, this.end).subscribe(data => {
        this.candles = data;
      });
    }
    if(!lastDate){
      this.data.getCandlestickData(this.symbol, this.start, this.result).subscribe(data => {
        this.candles = data;
      });
    }
  }

  holding(){
    
    this.click=true;
    var j = this.check.findIndex(val => val === true);
    var i = this.options.findIndex(val => val[1] === true);
    //lo 0 verrà cambiato dalla variabile di arrivo che dira quale giusto e quale no con un map o qualcosa del genere
    if(this.health>0 && this.motion==0 && this.progress <100){
    if(j == i){
      this.motion=1;
      this.progress += 10;
      this.correct[j] = true;
    }else{
        this.motion = 2;
        this.health--;
    }

  }
  }

  notHolding(){
    this.click=false;
  }

  checked(index: number){
    var j = this.check.findIndex(val => val === true);
    this.check[j] = false;
    this.check[index] = true
  }

}
