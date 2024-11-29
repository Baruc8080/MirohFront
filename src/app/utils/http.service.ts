import { Injectable, inject } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private utils = inject(UtilsService)
  private fetch = inject(HttpClient)
  private session = inject(SessionService)
  private router = inject(Router)

  /**
   * The base URL for HTTP requests.
   */
  private strBase: string = environment.app.apiUrl

  /**
   * Returns the base URL for the given endpoint.
   * @param endpoint - The endpoint to append to the base URL.
   * @param uri - The URI to prepend to the endpoint. Defaults to false.
   * @returns The complete URL formed by concatenating the URI and endpoint.
   */
  private baseUrl = (endpoint: string, uri: string | boolean = false): string => {
    if (uri === false) {
      return this.strBase.concat(endpoint)
    } else {
      return String(uri).concat(endpoint)
    }
  }

  /**
   * Generates the HttpHeaders object based on the provided headers and authorization flag.
   * If headers are provided, they will be added to the HttpHeaders object.
   * If the 'Content-Type' header is not present in the provided headers, it will be set to 'application/json'.
   * If authorization is set to true, the 'Authorization' header will be added using the token retrieved from the session.
   * @param headers - The headers to be added to the HttpHeaders object.
   * @param authorization - Flag indicating whether to include the 'Authorization' header.
   * @returns The generated HttpHeaders object.
   */
  private headers = (headers = {}, authorization = true) => {
    let _headers = new HttpHeaders()

    if (this.utils.isObjectEmpty(headers) === false) {
      for (const [key, value] of Object.entries(headers)) {
        _headers = _headers.set(String(key), String(value))
      }
    }

    if (this.utils.isKeyInArray(_headers.keys(), 'Content-Type') === false) {
      _headers = _headers.set('Content-Type', 'application/json')
    }

    if (authorization === true) {
      let token: { type: string, token: string } | null = this.session.getToken()
      _headers = _headers.set('Authorization', `${token?.type} ${token?.token}`)
    }

    return _headers
  }

  /**
   * Handles the error response from an HTTP request.
   * If the error status is 401, it displays an error toast and navigates to the home page.
   * Otherwise, it rejects the error.
   *
   * @param error - The error object returned from the HTTP request.
   * @param reject - The reject function to handle the error.
   */
  private fnError(error: any, reject: any) {
    if (error.status === 401) {
      console.error('Unauthorized')
      this.router.navigate(['/']);
    } else {
      return reject(error)
    }
  }

  /**
   * Makes a GET request to the specified endpoint.
   *
   * @param endpoint - The endpoint to send the GET request to.
   * @param uri - Optional boolean indicating whether to include the URI in the request.
   * @param headers - Optional headers to include in the request.
   * @returns A Promise that resolves with the response data.
   */
  get = (endpoint: string, uri = false, headers = {}, authorization = true): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.fetch.get<any>(this.baseUrl(endpoint, uri), { headers: this.headers(headers, authorization) })
        .subscribe({
          next: (response) => resolve(response),
          error: error => this.fnError(error, reject)
        })
    })
  }

  /**
   * Sends a POST request to the specified endpoint.
   *
   * @param endpoint - The endpoint to send the request to.
   * @param body - The request body.
   * @param uri - Optional flag indicating whether to include the base URI in the endpoint.
   * @param headers - Optional headers to include in the request.
   * @returns A Promise that resolves to the response from the server.
   */
  post = (endpoint: string, body: any, uri = false, headers = {}, authorization = true): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.fetch.post<any>(this.baseUrl(endpoint, uri), body, { headers: this.headers(headers, authorization) })
        .subscribe({
          next: (response) => resolve(response),
          error: error => this.fnError(error, reject)
        })
    })
  }

  /**
   * Sends a PUT request to the specified endpoint with the provided body.
   *
   * @param endpoint - The endpoint to send the request to.
   * @param body - The body of the request.
   * @param uri - Optional flag indicating whether to include the base URI in the endpoint.
   * @param headers - Optional headers to include in the request.
   * @returns A Promise that resolves to the response of the request.
   */
  put = (endpoint: string, body: any, uri = false, headers = {}, authorization = true): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.fetch.put<any>(this.baseUrl(endpoint, uri), body, { headers: this.headers(headers, authorization) })
        .subscribe({
          next: (response) => resolve(response),
          error: error => this.fnError(error, reject)
        })
    })
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param endpoint - The endpoint to send the request to.
   * @param uri - Optional flag indicating whether to include the URI in the endpoint.
   * @param headers - Optional headers to include in the request.
   * @returns A Promise that resolves with the response data.
   */
  delete = (endpoint: string, uri = false, headers = {}, authorization = true): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.fetch.delete<any>(this.baseUrl(endpoint, uri), { headers: this.headers(headers, authorization) })
        .subscribe({
          next: (response) => resolve(response),
          error: error => this.fnError(error, reject)
        })
    })
  }
}
