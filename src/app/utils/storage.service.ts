import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

/**
 * Represents a service for interacting with the local storage.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    // Update the current storage whenever the storage changes.
    window.addEventListener('storage', () => this.next(), false);
  }

  /**
   * Represents the current storage state.
   */
  private currentStorage = new BehaviorSubject({})

  /**
   * Clears the localStorage and triggers the 'next' event.
   */
  clear = () => { localStorage.clear(); this.next() }

  /**
   * Retrieves the value associated with the specified key from the local storage.
   *
   * @param key - The key of the item to retrieve.
   * @returns The value associated with the specified key, or null if the key does not exist.
   */
  getItem = (key: string) => localStorage.getItem(key)

  /**
   * Retrieves the key at the specified index from the local storage.
   *
   * @param index - The index of the key to retrieve.
   * @returns The key at the specified index.
   */
  key = (index: number) => localStorage.key(index)

  /**
   * Returns the number of items stored in the local storage.
   * @returns The number of items stored in the local storage.
   */
  length = () => localStorage.length

  /**
   * Removes an item from the local storage based on the provided key.
   *
   * @param key - The key of the item to be removed.
   */
  removeItem = (key: string) => localStorage.removeItem(key)

  /**
   * Sets the value for the specified key in the local storage.
   * @param key - The key to set the value for.
   * @param value - The value to be set.
   */
  setItem = (key: string, value: string) => { localStorage.setItem(key, value); this.next() }

  /**
   * Updates the current storage with a copy of the localStorage object.
   */
  next = () => this.currentStorage.next({ ...localStorage })

  /**
   * Watches for changes in the specified key of the current storage.
   * @param key - The key to watch for changes.
   * @returns An Observable that emits the value of the specified key whenever it changes.
   */
  watch = (key: string) => this.currentStorage.pipe(map((items: any) => items[key]))

  /**
   * Returns an observable that emits the current storage value whenever it changes.
   * @returns {Observable<any>} An observable that emits the current storage value.
   */
  watchAll = (): Observable<any> => this.currentStorage.asObservable()
}
