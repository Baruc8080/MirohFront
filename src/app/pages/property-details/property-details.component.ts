import { Component, inject } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleriaModule } from 'primeng/galleria';
import { ActivatedRoute } from '@angular/router';
import { RealEstateService } from '@services/realestate.service';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { ImageModule } from 'primeng/image';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [
    GalleriaModule,
    NgbAccordionModule,
    MainHeaderComponent,
    MainFooterComponent,
    ImageModule,
    RouterModule
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsPage {
  private activatedRoute = inject(ActivatedRoute);
  private realEstateService = inject(RealEstateService);

  public images: { itemImageSrc: string, thumbnailImageSrc?: string }[] = [];
  public property: any = undefined

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async routeParams => {
      await this.realEstateService.getPropertyDetails(routeParams['slug']).then((response: any) => {
        this.property = response

        this.images = []

        /* if (this.property.hero?.name != null) {
          this.images.push({ itemImageSrc: this.property.hero?.uri, thumbnailImageSrc: this.property.hero?.uri })
        } else {
          this.images.push({ itemImageSrc: './assets/images/media-placeholder.png', thumbnailImageSrc: './assets/images/media-placeholder.png' })
        } */

        if (this.property.gallery != null) {
          for (const item of this.property.gallery) {
            this.images.push({ itemImageSrc: item.uri, thumbnailImageSrc: item.uri })
          }
        }
      })
    });
  }

  share() {
    if (this.property != undefined) {
      navigator.share({
        title: this.property?.title,
        text: this.property?.address + ', ' + this.property?.city + ', ' + this.property?.state,
        url: 'https://mirohmasterbroker.com/propiedades/' + this.property?.slug
      });
    }
  }
}
