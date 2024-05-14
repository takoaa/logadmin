import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';
  showMainComponent = true;

  constructor(private router: Router) {
    // Listen to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Logic to determine if app-main should be hidden
        this.showMainComponent = event.url === '/' || event.url === '/home';
      }
    });
  }
}
