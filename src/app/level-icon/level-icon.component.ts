import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StartLvlComponent } from "../start-lvl/start-lvl.component";
import { LevelsService } from '../levels.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-level-icon',
    imports: [StartLvlComponent, NgClass],
    templateUrl: './level-icon.component.html',
    styleUrl: './level-icon.component.css',
    standalone: true
})
export class LevelIconComponent implements OnInit, OnChanges{
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
    id: number,
    color: string
    }
    progress: number = 100;
    @Input({required: true}) idUser: string = "1";
    state: string = "not available";
    phase: (String | null)[] = [];
    gridTemplateColumns:string = `repeat(3, 33.3%)`;

    constructor(private levelService: LevelsService, private elRef: ElementRef){

    }

    colorChecker(){
      this.progress = 100;
        this.levelService.getStatus(this.idUser, this.single.id.toString()).subscribe((data:any) =>{
        this.state = data.status
        this.phase = data.phase;
        console.log("idLevel: ", this.single.id)
        console.log("phase:" +this.phase.length);
        
        this.progress = this.progress/this.phase.length
        console.log("origress: ", this.progress);
        this.gridTemplateColumns = `repeat(${this.phase.length}, ${this.progress}%)`;

        
      
      if(this.single.type === "test"){
        this.single.color = "#1F1F1F"
      }
      })

    }

    ngOnChanges(changes: SimpleChanges): void {
      //this.colorChecker()
    }
    
    ngOnInit(): void {
        this.colorChecker();
    }

  pressed:boolean = false;

  click(){
    this.pressed = true;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Controlla se il click è avvenuto *fuori* dal componente
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.pressed = false;
    }
  }
}
