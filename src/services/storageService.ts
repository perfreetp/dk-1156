import Taro from '@tarojs/taro';
import { Item, FamilyMember } from '../types';
import { mockItems, mockMembers } from '../data/mockData';

const STORAGE_KEY_ITEMS = 'family_archive_items';
const STORAGE_KEY_MEMBERS = 'family_archive_members';
const STORAGE_KEY_CURRENT_USER = 'family_archive_current_user';

class StorageService {
  private getStorage<T>(key: string, defaultValue: T): T {
    try {
      const data = Taro.getStorageSync(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('[Storage] Get error:', key, e);
    }
    return defaultValue;
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      Taro.setStorageSync(key, JSON.stringify(value));
    } catch (e) {
      console.error('[Storage] Set error:', key, e);
    }
  }

  getItems(): Item[] {
    return this.getStorage<Item[]>(STORAGE_KEY_ITEMS, mockItems);
  }

  setItems(items: Item[]): void {
    this.setStorage(STORAGE_KEY_ITEMS, items);
  }

  getMembers(): FamilyMember[] {
    return this.getStorage<FamilyMember[]>(STORAGE_KEY_MEMBERS, mockMembers);
  }

  setMembers(members: FamilyMember[]): void {
    this.setStorage(STORAGE_KEY_MEMBERS, members);
  }

  getCurrentUserId(): string {
    return this.getStorage<string>(STORAGE_KEY_CURRENT_USER, '1');
  }

  setCurrentUserId(userId: string): void {
    this.setStorage(STORAGE_KEY_CURRENT_USER, userId);
  }

  clearAll(): void {
    try {
      Taro.removeStorageSync(STORAGE_KEY_ITEMS);
      Taro.removeStorageSync(STORAGE_KEY_MEMBERS);
    } catch (e) {
      console.error('[Storage] Clear error:', e);
    }
  }
}

export const storageService = new StorageService();
