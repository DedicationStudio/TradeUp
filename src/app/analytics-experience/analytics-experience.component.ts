import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-analytics-experience',
    imports: [NgClass],
    templateUrl: './analytics-experience.component.html',
    styleUrl: './analytics-experience.component.css',
    standalone: true
})
export class AnalyticsExperienceComponent {
  @Output() nameCategory = new EventEmitter<string>();
    from: any[]= [{
      'title': 'I’m new to the subject',
      'url': '../../assets/image/zero-graph.png'
    },
    {
      'title': 'I know some common things',
      'url': '../../assets/image/1-graph.png'
    },
    {
      'title': 'I have a basic Knowledge',
      'url': '../../assets/image/2-graph.png'
    },
    {
      'title': 'I have already done Trading',
      'url': '../../assets/image/3-graph.png'
    },
    {
      'title': 'I’m an expert',
      'url': '../../assets/image/4-graph.png'
    }
  ];

  selected: number = -1
  
    categoryOutput(name: string, i:number){
      this.nameCategory.emit(name)
      this.selected= i;
    }
}
