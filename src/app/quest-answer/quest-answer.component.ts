import { Component, EventEmitter, Output, ViewChild, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RiveCanvas, RiveLinearAnimation, RiveModule, RiveStateMachine } from 'ng-rive';
import 'zone.js';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-quest-answer',
    imports: [RiveCanvas, RiveStateMachine, JsonPipe, RiveModule],
    templateUrl: './quest-answer.component.html',
    styleUrl: './quest-answer.component.css',
    standalone: true
})
export class QuestAnswerComponent {
  @Output() answer = new EventEmitter<string>();
  pushing: boolean[] = [false, false];

  pressed(num:number){
    this.pushing[num] = true;
    if(num == 0){
      this.answer.emit("sell");
    }else{
      this.answer.emit("buy");

    }
  } 

  released(num: number){
    this.pushing[num] = false
  }

}
