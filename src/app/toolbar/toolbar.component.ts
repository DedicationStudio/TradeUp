import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    imports: [NgClass],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.css',
    standalone: true
})
export class ToolbarComponent {
  clicked: Record<string, boolean> = {
    "learn": true,
    "leaderboard": false,
    "quest": false,
    "account": false,
    "news": false
  }

  focus(click: string){
    const focused = Object.keys(this.clicked).find(key => this.clicked[key]);

    if(focused){
      this.clicked[focused] = false;
    }

    this.clicked[click] = true
  }
}
