import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewAppStorageService {

  private _storage: Storage | null = null;
  searchTerm: any;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  public async set(key: string, value: string): Promise<void> {
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  public async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  public async clear(): Promise<void> {
    await this._storage?.clear();
  }

  public async keys(): Promise<string[]> {
    const keys = await this._storage?.keys();
    return keys ? keys : [];
  }
}
