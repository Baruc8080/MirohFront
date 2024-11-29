import { Injectable, inject } from '@angular/core';
import { HttpService } from '@utils/http.service';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {
  private http = inject(HttpService)

  public getTypes = async () => await this.http.get(`/v1/realestate/type`, false)
    .then((response: any) => response.data.content)
    .catch((error: any) => error)

  public getStatus = async () => await this.http.get(`/v1/realestate/status`, false)
    .then((response: any) => response.data.content)
    .catch((error: any) => error)

  public getLocations = async () => await this.http.get(`/v1/realestate/location/address`, false)
    .then((response: any) => response.data.content)
    .catch((error: any) => error)

  public getProperties = async (limit: number = 0, recommended = false) => {
    let queryParams = '?'

    if (limit > 0) {
      queryParams += `limit=${limit}`
    }

    if (recommended === true) {
      queryParams += `&recommended=${recommended}`
    }

    return await this.http.get(`/v1/realestate/${queryParams}`, false)
      .then((response: any) => response.data)
      .catch((error: any) => error)
  }

  public getPropertyDetails = async (slug: string) => await this.http.get(`/v1/realestate/${slug}?by=slug`, false)
    .then((response: any) => response.data.content)
    .catch((error: any) => error)
}
