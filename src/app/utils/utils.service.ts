import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /**
   * Checks if an object is empty.
   * @param objectName - The object to check.
   * @returns True if the object is empty, false otherwise.
   */
  public isObjectEmpty = (objectName: any) => {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  }

  /**
   * Checks if a given key exists in an object.
   *
   * @param objectName - The object to check.
   * @param key - The key to search for.
   * @returns A boolean indicating whether the key exists in the object.
   */
  public isKeyInObject = (objectName: any, key: string) => {
    if (this.isObjectEmpty(objectName) === false) {
      return Object.keys(objectName).includes(key)
    }

    return false
  }

  /**
   * Checks if an array is empty.
   * @param arrayName - The array to check.
   * @returns True if the array is empty, false otherwise.
   */
  public isArrayEmpty = (arrayName: any[]) => {
    return (
      arrayName &&
      arrayName.length === 0 &&
      arrayName.constructor === Array
    );
  }

  /**
   * Checks if a key exists in an array.
   * @param arrayName - The array to check.
   * @param key - The key to search for.
   * @returns True if the key exists in the array, false otherwise.
   */
  public isKeyInArray = (arrayName: any[], key: string) => {
    if (this.isArrayEmpty(arrayName) === false) {
      return arrayName.includes(key)
    }

    return false
  }

  /**
   * Orders an array of objects by a specified key in ascending order.
   * @param array - The array to be ordered.
   * @param key - The key to sort the array by.
   * @returns The ordered array.
   */
  public orderArrayBy = (array: any[], key: string) => {
    array.sort((a: any, b: any) => {
      if (a[key].toUpperCase() < b[key].toUpperCase()) { return -1; }
      if (a[key].toUpperCase() > b[key].toUpperCase()) { return 1; }
      return 0;
    })

    return array
  }

  /**
   * Concatenates two objects into a new object.
   * @param queryParams - The first object to be concatenated.
   * @param concat - The second object to be concatenated.
   * @returns The concatenated object.
   */
  public concatTwoObjects = (queryParams: any, concat: any) => {
    return { ...queryParams, ...concat }
  }

  /**
   * Regular expression used to separate values in the utils service.
   */
  public separatorExp: RegExp = /,| /;
}
