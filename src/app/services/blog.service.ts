import { Injectable, inject } from '@angular/core';
import { HttpService } from '@utils/http.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpService)

  public getList = async (limit: number = 0) => {
    let queryParams = '?'

    if (limit > 0) {
      queryParams += `limit=${limit}`
    }

    return await this.http.get(`/v1/blog/${queryParams}`, false)
      .then((response: any) => response.data)
      .catch((error: any) => error)
  }

  public getBlogDetails = async (slug: string) => await this.http.get(`/v1/blog/${slug}?by=slug`, false)
    .then((response: any) => response.data.content)
    .catch((error: any) => error)
}
