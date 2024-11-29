import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { BlogService } from '@services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    MainHeaderComponent,
    MainFooterComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListPage {
  private blogService = inject(BlogService)
  public blogList: any[] = []

  async ngOnInit() {
    await this.blogService.getList().then((response) => this.blogList = response.content)

    console.log(this.blogList);

  }
}
