import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { PropertyThumbComponent } from '@components/property-thumb/property-thumb.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from '@services/blog.service';
import { RealEstateService } from '@services/realestate.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainFooterComponent,
    NgbAccordionModule,
    PropertyThumbComponent,
    CommonModule,
    RouterModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomePage {
  private realEstateService = inject(RealEstateService)
  private blogService = inject(BlogService)
  public propertiesList: any = []
  public blogList: any = []
  async ngOnInit() {
    await this.realEstateService.getProperties(4, true).then((response) => this.propertiesList = response.content)
    await this.blogService.getList(4).then((response) => this.blogList = response.content)
  }
}
