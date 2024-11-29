import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { BlogService } from '@services/blog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainFooterComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsPage {
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService)

  public blog: any = undefined

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async routeParams => {
      await this.blogService.getBlogDetails(routeParams['slug']).then((response: any) => {
        this.blog = response
      })
    });
  }
}
