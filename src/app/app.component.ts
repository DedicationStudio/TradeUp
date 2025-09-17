import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
  constructor(private titleService: Title, private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const url = this.router.url;
      if (url.startsWith('/learn')) {
        this.titleService.setTitle('TradeUp - Learn');
      } else if (url.startsWith('/dashboard')) {
        this.titleService.setTitle('TradeUp - Dashboard');
      } else {
        this.titleService.setTitle('TradeUp');
      }
    });
}

}
