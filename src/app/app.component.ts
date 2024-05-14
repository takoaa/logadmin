import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMainComponent = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);  // Add this to see the actual URL being navigated to
        this.showMainComponent = (event.urlAfterRedirects === '/');
      }
    });
  }
}