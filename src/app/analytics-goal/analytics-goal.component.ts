import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-analytics-goal',
    imports: [NgClass],
    templateUrl: './analytics-goal.component.html',
    styleUrl: './analytics-goal.component.css',
    standalone: true
})
export class AnalyticsGoalComponent {
  @Output() nameCategory = new EventEmitter<string>();
    from: any[]= [{
      'achive': '5 min/day',
      'type': 'casual'
    },
    {
      'achive': '10 min/day',
      'type': 'regular'
    },
    {
      'achive': '15 min/day',
      'type': 'serious'
    },
    {
      'achive': '20 min/day',
      'type': 'intense'
    }
  ];
  
  selected: number = -1
  
    categoryOutput(name: string, i:number){
      this.nameCategory.emit(name)
      this.selected= i;
    }
}
