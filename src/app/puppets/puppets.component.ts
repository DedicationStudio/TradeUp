import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, importProvidersFrom, viewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RiveCanvas, RiveLinearAnimation, RiveModule, RiveStateMachine } from 'ng-rive';
import 'zone.js';
import { JsonPipe } from '@angular/common';
import { ResponsiveService } from '../responsive.service';
@Component({
    selector: 'app-puppets',
    imports: [RiveCanvas, RiveStateMachine, JsonPipe, RiveModule],
    templateUrl: './puppets.component.html',
    styleUrl: './puppets.component.css',
    providers: [ResponsiveService],
    standalone: true
})
export class PuppetsComponent implements OnInit, OnChanges{
  
  @Input() correct!: number;
  
  right:boolean = false;
  wrong:boolean = false;
  

  ngOnChanges(changes: SimpleChanges): void {
    this.puppet();
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async puppet(){
    console.log(this.correct)
    if(this.correct == 1){
      this.right = true;
      await this.sleep(1000); 
      console.log(this.right)
      this.right = false;
      console.log(this.right)
    }else if(this.correct == 2){
      this.wrong = true;
      await this.sleep(1000); 
      this.wrong = false
    }

    this.correct = 0;
  }


  ngOnInit(): void {
    this.puppet();
  }
}
