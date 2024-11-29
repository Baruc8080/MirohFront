import { Component } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isPopState = false;

  constructor(private router: Router, private locStrat: LocationStrategy) { }

  ngOnInit(): void {
    this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.router.events.subscribe(event => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationEnd && !this.isPopState) {
        window.scrollTo(0, 0);
        this.isPopState = false;
      }

      // Ensures that isPopState is reset
      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });

    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
