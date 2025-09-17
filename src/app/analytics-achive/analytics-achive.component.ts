import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-analytics-achive',
    imports: [],
    templateUrl: './analytics-achive.component.html',
    styleUrl: './analytics-achive.component.css',
    standalone: true
})
export class AnalyticsAchiveComponent {
  @Output() nameCategory = new EventEmitter<string>();
  from: any[]= [
    {
    'title': 'Aquire coinfidence with the Market',
    'status': 'Have a guide to all patterns and ways to predict the market',
    'url': '../../assets/image/trade.png'
  },
  {
    'title': 'Have a better understanding of Economy',
    'status': 'Have a guide to all patterns and ways to predict the market',
    'url': '../../assets/image/graph.png'
  },
  {
    'title': 'Develop a Learning Habit',
    'status': 'Have a guide to all patterns and ways to predict the market',
    'url': '../../assets/image/knowledge.png'
  }
];

  categoryOutput(name: string){
    this.nameCategory.emit(name)
  }
}
