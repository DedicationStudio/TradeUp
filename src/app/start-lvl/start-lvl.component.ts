import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, importProvidersFrom, viewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RiveCanvas, RiveLinearAnimation, RiveModule, RiveStateMachine } from 'ng-rive';
import 'zone.js';
import { JsonPipe, NgClass } from '@angular/common';
import { ResponsiveService } from '../responsive.service';
import { RouterLink } from '@angular/router';
import { LevelsService } from '../levels.service';

@Component({
    selector: 'app-start-lvl',
    imports: [RiveCanvas, RiveStateMachine, JsonPipe, RiveModule, RouterLink, NgClass],
    templateUrl: './start-lvl.component.html',
    styleUrl: './start-lvl.component.css',
    providers: [ResponsiveService],
    standalone: true
})
export class StartLvlComponent implements OnInit{
  @Input() single!: {
    icon: string;
    title: string;
    state: string;
    type: string;
    phase: number;
    total: number;
    tag: String[];
    section: number,
    repeat_level: number,
    id: number
    }

    start: number = 0;
    progress: number = 100;
    @Input({required: true}) idUser!: string;
    phase: (String | null)[] = [];
    gridTemplateColumns:string = `repeat(3, 33.3%)`;
    
    constructor(private levelService: LevelsService, private elRef: ElementRef){
    
    }

  colorChecker(){
    this.progress = 100;
      this.levelService.getStatus(this.idUser, this.single.id.toString()).subscribe((data:any) =>{
      this.phase = data.phase;
      this.start = this.phase.findIndex((el: any) => el === null);
      console.log(this.start)

      if(this.start == -1){
        this.start=this.single.total;
      }
      this.progress = this.progress/this.phase.length
      this.gridTemplateColumns = `repeat(${this.phase.length}, ${this.progress}%)`;

    })

  }

  resetPhase(){
    
    this.levelService.getStatus(this.idUser, this.single.id.toString()).subscribe((data:any) =>{
      if(data.status === "failed"){
    this.levelService.zeroPhase(this.idUser, this.single.id.toString()).subscribe((data:any)=>{});
      }
    });
  }

  ngOnInit(): void {
    console.log(this.single.id)
    this.colorChecker();
    this.levelService.getStatus("1", "1")
}

}
