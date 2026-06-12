import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Item, FamilyMember, FilterOptions } from '../types';
import { storageService } from '../services/storageService';

interface AppContextType {
  items: Item[];
  members: FamilyMember[];
  currentMember: FamilyMember;
  filter: FilterOptions;
  isLoading: boolean;
  setFilter: (filter: FilterOptions) => void;
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => Item;
  updateItem: (id: string, updates: Partial<Item>) => Item | undefined;
  deleteItem: (id: string) => boolean;
  getItemById: (id: string) => Item | undefined;
  getFilteredItems: () => Item[];
  getTimelineData: () => { era: string; label: string; items: Item[] }[];
  getMemberItems: (memberId: string) => Item[];
  addComment: (itemId: string, content: string) => void;
  getOverdueReminders: () => Item[];
  refreshData: () => void;
  switchUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [currentMemberId, setCurrentMemberId] = useState<string>('1');
  const [filter, setFilter] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(() => {
    setIsLoading(true);
    try {
      const loadedItems = storageService.getItems();
      const loadedMembers = storageService.getMembers();
      const currentId = storageService.getCurrentUserId();

      setItems(loadedItems);
      setMembers(loadedMembers);
      setCurrentMemberId(currentId);
    } catch (e) {
      console.error('[AppContext] Load error:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveItems = useCallback((newItems: Item[]) => {
    setItems(newItems);
    storageService.setItems(newItems);
  }, []);

  const currentMember = members.find(m => m.id === currentMemberId) || members[0];

  const canViewItem = useCallback((item: Item, viewerId: string): boolean => {
    if (item.viewPermission === 'all') return true;
    if (item.viewPermission === 'family') {
      return item.familyMembers.includes(viewerId) || item.createdBy === viewerId;
    }
    return item.createdBy === viewerId;
  }, []);

  const getVisibleItems = useCallback((): Item[] => {
    return items.filter(item => canViewItem(item, currentMemberId));
  }, [items, currentMemberId, canViewItem]);

  const addItem = useCallback((itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    const newItems = [newItem, ...items];
    saveItems(newItems);

    const updatedMembers = members.map(m => {
      if (m.id === newItem.createdBy) {
        return { ...m, itemCount: m.itemCount + 1 };
      }
      return m;
    });
    setMembers(updatedMembers);
    storageService.setMembers(updatedMembers);

    return newItem;
  }, [items, members, saveItems]);

  const updateItem = useCallback((id: string, updates: Partial<Item>): Item | undefined => {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) return undefined;

    const updatedItem = {
      ...items[itemIndex],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    const newItems = [...items];
    newItems[itemIndex] = updatedItem;
    saveItems(newItems);

    return updatedItem;
  }, [items, saveItems]);

  const deleteItem = useCallback((id: string): boolean => {
    const item = items.find(i => i.id === id);
    if (!item) return false;

    const newItems = items.filter(i => i.id !== id);
    saveItems(newItems);

    const updatedMembers = members.map(m => {
      if (item.familyMembers.includes(m.id) || m.id === item.createdBy) {
        return { ...m, itemCount: Math.max(0, m.itemCount - 1) };
      }
      return m;
    });
    setMembers(updatedMembers);
    storageService.setMembers(updatedMembers);

    return true;
  }, [items, members, saveItems]);

  const getItemById = useCallback((id: string): Item | undefined => {
    return items.find(item => item.id === id);
  }, [items]);

  const getFilteredItems = useCallback((): Item[] => {
    let result = getVisibleItems();

    if (filter.era) {
      result = result.filter(item => item.era === filter.era);
    }
    if (filter.room) {
      result = result.filter(item => item.room === filter.room);
    }
    if (filter.damageLevel) {
      result = result.filter(item => item.damageLevel === filter.damageLevel);
    }
    if (filter.searchText) {
      const searchLower = filter.searchText.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.story.toLowerCase().includes(searchLower) ||
        item.relatedPerson.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [filter, getVisibleItems]);

  const getTimelineData = useCallback((): { era: string; label: string; items: Item[] }[] => {
    const visibleItems = getVisibleItems();
    const grouped: Record<string, Item[]> = {};

    visibleItems.forEach(item => {
      if (!grouped[item.era]) {
        grouped[item.era] = [];
      }
      grouped[item.era].push(item);
    });

    const eraOrder = ['before1950', '1950-1970', '1970-1990', '1990-2010', 'after2010'];
    const eraLabels: Record<string, string> = {
      before1950: '1950年前',
      '1950-1970': '1950-1970年代',
      '1970-1990': '1970-1990年代',
      '1990-2010': '1990-2010年代',
      after2010: '2010年后'
    };

    return eraOrder
      .filter(era => grouped[era]?.length > 0)
      .map(era => ({
        era,
        label: eraLabels[era],
        items: grouped[era]
      }));
  }, [getVisibleItems]);

  const getMemberItems = useCallback((memberId: string): Item[] => {
    return items.filter(item => {
      const isRelated = item.familyMembers.includes(memberId) || item.createdBy === memberId;
      if (!isRelated) return false;
      return canViewItem(item, currentMemberId);
    });
  }, [items, currentMemberId, canViewItem]);

  const addComment = useCallback((itemId: string, content: string): void => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newComment = {
      id: Date.now().toString(),
      memberId: currentMemberId,
      memberName: currentMember?.name || '未知',
      content,
      createdAt: new Date().toISOString().split('T')[0]
    };

    updateItem(itemId, {
      comments: [...item.comments, newComment]
    });
  }, [items, currentMemberId, currentMember, updateItem]);

  const getOverdueReminders = useCallback((): Item[] => {
    const today = new Date().toISOString().split('T')[0];
    return getVisibleItems().filter(item => item.nextReviewDate <= today);
  }, [getVisibleItems]);

  const refreshData = useCallback(() => {
    loadData();
  }, [loadData]);

  const switchUser = useCallback((userId: string) => {
    setCurrentMemberId(userId);
    storageService.setCurrentUserId(userId);
  }, []);

  const value: AppContextType = {
    items,
    members,
    currentMember,
    filter,
    isLoading,
    setFilter,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getFilteredItems,
    getTimelineData,
    getMemberItems,
    addComment,
    getOverdueReminders,
    refreshData,
    switchUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
