import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';

/**
 * Represents the user session information.
 */
export interface IUserSession {
  userId: string,
  email: string,
  name: string,
  username: string
}

/**
 * Service for managing session data.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  /**
   * Instance of JwtHelperService for decoding JSON Web Tokens.
   */
  public jwtHelperService = new JwtHelperService();
  /**
   * The key used to store the authenticated user in the session storage.
   */
  public USER_KEY: string = 'auth-user';
  /**
   * The key used to store the authentication token in the session storage.
   */
  public TOKEN_KEY: string = 'auth-token';

  constructor(
    private storage: StorageService
  ) { }

  /**
   * Checks if the user is currently logged in.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  public isLoggedIn = (): boolean => this.storage.getItem(this.USER_KEY) ? true : false

  /**
   * Verifica si existe un token en el almacenamiento.
   * @returns {boolean} true si existe un token, false de lo contrario.
   */
  public isTokenExist = (): boolean => this.storage.getItem(this.TOKEN_KEY) ? true : false

  /**
   * Clears the session data.
   * @returns {void}
   */
  public clear = (): void => this.storage.clear()

  /**
   * Saves the token in the storage service.
   * @param {string} token - The token to be saved.
   * @param {string} type - The type of the token.
   * @returns {void}
   */
  public saveToken = (token: string, type: string): void => {
    this.storage.removeItem(this.TOKEN_KEY);
    this.storage.setItem(this.TOKEN_KEY, `${type} ${token}`);
  }

  /**
   * Retrieves the token from the session storage.
   * @returns An object containing the token type and token value, or null if the token is not found.
   */
  public getToken = (): { type: string, token: string } | null => {
    const token = this.storage.getItem(this.TOKEN_KEY)

    return (token) ? { type: token.split(" ")[0], token: token.split(" ")[1] } : null;
  }

  /**
   * Removes the token from the storage.
   */
  public removeToken = (): void => this.storage.removeItem(this.TOKEN_KEY)

  /**
   * Retrieves the data from the token.
   * @returns The decoded token as a string or null if the token is not available.
   */
  public getDataToken = () => this.jwtHelperService.decodeToken(String(this.getToken()?.token))

  /**
   * Saves the user data in the storage.
   * @param {any} user - The user data to be saved.
   * @returns {void}
   */
  public saveUser = (user: any): void => {
    this.storage.removeItem(this.USER_KEY);
    this.storage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Retrieves the information of the current user.
   * @returns The information of the current user or null if there is no user.
   */
  public getUser = (): IUserSession | null => {
    const user = this.storage.getItem(this.USER_KEY)

    return (user) ? JSON.parse(user) : null;
  }

  /**
   * Retrieves the role of the current session.
   * @returns The role of the current session.
   */
  public getRole = () => this.getDataToken().permissions[0]

  /**
   * Retrieves the permissions of the current session.
   * @returns The permissions of the current session.
   */
  public getPermissions = () => this.getDataToken().permissions[1]

  /**
   * Checks if a permission exists.
   * @param permission - The permission to check.
   * @returns True if the permission exists, false otherwise.
   */
  public existsPermissions = (permission: string[]) => this.getPermissions().some((elm: any) => permission.includes(elm))
}
