import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-analytics-how',
    imports: [NgClass],
    templateUrl: './analytics-how.component.html',
    styleUrl: './analytics-how.component.css',
    standalone: true
})
export class AnalyticsHowComponent {
@Output() nameCategory = new EventEmitter<string>();
  from: any[]= [
    {
    'title': 'Trade',
    'url': '../../assets/image/trade.png'
  },
  {
    'title': 'General Knowledge',
    'url': '../../assets/image/knowledge.png'
  },
  {
    'title': 'Understand Market',
    'url': '../../assets/image/graph.png'
  },
  {
    'title': 'Work',
    'url': '../../assets/image/work.png'
  },
  {
    'title': 'Second Entrance',
    'url': '../../assets/image/market.png'
  },
  {
    'title': 'Other',
    'url': '../../assets/image/other.png'
  }
];

selected:number = -1

  categoryOutput(name: string, i:number){
    this.nameCategory.emit(name)
    this.selected=i;
  }
}
