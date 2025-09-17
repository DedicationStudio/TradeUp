import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-analytics-from',
    imports: [NgClass],
    templateUrl: './analytics-from.component.html',
    styleUrl: './analytics-from.component.css',
    standalone: true
})
export class AnalyticsFromComponent {
    @Output() nameCategory = new EventEmitter<string>();
  from: any[]= [{
    'title': 'News/Blog/Article',
    'url': '../../assets/image/news.png'
  },
  {
    'title': 'Friends/Family',
    'url': '../../assets/image/people.png'
  },
  {
    'title': 'TV',
    'url': '../../assets/image/tv.png'
  },
  {
    'title': 'Youtube',
    'url': '../../assets/image/youtube.png'
  },
  {
    'title': 'Facebook/Instagram',
    'url': '../../assets/image/social.png'
  },
  {
    'title': 'Tik Tok',
    'url': '../../assets/image/tiktok.webp'
  },
  {
    'title': 'Google Search',
    'url': '../../assets/image/googleIcon.png'
  },
  {
    'title': 'Other',
    'url': '../../assets/image/other.png'
  },
];

selected: number= -1

  categoryOutput(name: string, i:number){
    this.nameCategory.emit(name)
    this.selected= i;
  }
}
