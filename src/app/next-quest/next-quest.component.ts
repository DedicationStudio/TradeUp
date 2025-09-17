import { JsonPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RiveCanvas, RiveModule, RiveStateMachine } from 'ng-rive';
import { DataService } from '../data.service';
import { AudioService } from '../audio.service';

@Component({
    selector: 'app-next-quest',
    imports: [RiveCanvas, RiveStateMachine, JsonPipe, RiveModule, NgClass],
    templateUrl: './next-quest.component.html',
    styleUrl: './next-quest.component.css',
    standalone: true
})
export class NextQuestComponent implements OnInit, OnChanges{
  @Input() answer!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() short!: string;
  @Output() continue = new EventEmitter<number>();

  answerNum!: number;
  right = "right_continue";
  wrong = "wrong_continue";
  height = 200;
  right_why = "correct_why";
  wrong_why = "wrong_why";
  responsive_right_why = "responsive_correct_why";
  responsive_wrong_why = "responsive_wrong_why";

  constructor(private dataService: DataService, private audio: AudioService) {}

  
  pushing: boolean = false;
  pushing_why: boolean = false;
  why:boolean = false;
  windowWidth = window.innerWidth;
  ngOnInit(): void {

    if(this.windowWidth<768){
        this.right = "responsive_right_continue";
        this.wrong = "responsive_wrong_continue";
        this.height = 100;
    }
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("answer = ",this.answer)

    if(this.answer == 1){
      this.audio.correct();

      
    }else{
      this.audio.wrong();

    }
    

  }

  pressed(){
    console.log(this.answer)
    this.pushing = true;
    
    this.continue.emit(0);
  } 

  released(){
    this.pushing = false
  }

  pressed_why(){
    this.pushing_why = true;
    this.why = true;
  }

  released_why(){
    this.pushing_why = false;
  }
}
