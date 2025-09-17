import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RiveCanvas, RiveModule, RiveStateMachine } from 'ng-rive';
import { DataService } from '../data.service';
import { AudioService } from '../audio.service';

@Component({
    selector: 'app-quest-finish',
    imports: [RouterLink, RiveCanvas, RiveStateMachine, JsonPipe, RiveModule, NgClass],
    templateUrl: './quest-finish.component.html',
    styleUrl: './quest-finish.component.css',
    standalone: true
})
export class QuestFinishComponent implements OnInit {

  answerNum!: number;
  @Input({required: true}) idUser!: string;
  height = 200;
  width = 230;

  constructor(private dataService: DataService, private audio: AudioService, private router: Router) {}

  
  pushing: boolean = false;
  pushing_why: boolean = false;
  why:boolean = false;
  windowWidth = window.innerWidth;
  ngOnInit(): void {
    if(this.windowWidth<=430){
      this.width=150;
      this.height=75;
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    

  }

  pressed(){
    this.pushing = true;
        this.router.navigate(['/learn', this.idUser]);

    
  } 

  released(){
    this.pushing = false
  }

  pressed_why(){
    this.pushing_why = true;
    this.why = true;
    this.router.navigate(['/learn', this.idUser]);
  }

  released_why(){
    this.pushing_why = false;
  }
}
