import { Component } from '@angular/core';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainFooterComponent,
    NgbAccordionModule,
    RouterModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutPage {
}
