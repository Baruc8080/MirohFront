import { Component } from '@angular/core';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainFooterComponent
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyPage {
}
