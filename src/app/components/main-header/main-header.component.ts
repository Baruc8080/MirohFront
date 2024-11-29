import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'main-header',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterModule, ButtonModule, NgbDropdownModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(200%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('1s ease', style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ]),
    trigger('openState', [
      state('initial', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      state('final', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('initial <=> final', [
        animate('1s ease')
      ])
    ])
  ]
})

export class MainHeaderComponent {
  @Input() floatingBottom: boolean = false;
  private offcanvasService = inject(NgbOffcanvas);
  public openState:string = 'initial';
  open = (content: TemplateRef<any>) => {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' });
    this.openState = 'final';
  }
  close = (content: TemplateRef<any>) => {
    this.offcanvasService.dismiss(content);
    this.openState = 'initial';
  }
}
