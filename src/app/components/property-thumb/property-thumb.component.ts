import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'property-thumb',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterModule
  ],
  templateUrl: './property-thumb.component.html',
  styleUrl: './property-thumb.component.scss'
})
export class PropertyThumbComponent {
  @Input() data: any
}
