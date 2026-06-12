import { useState, useCallback, useMemo } from 'react';
import { Item, FilterOptions, FamilyMember } from '../types';
import { itemService, memberService } from '../services/itemService';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>(itemService.getAll());
  const [filter, setFilter] = useState<FilterOptions>({});

  const filteredItems = useMemo(() => {
    return itemService.getFiltered(filter);
  }, [filter]);

  const addItem = useCallback((item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem = itemService.create(item);
    setItems(itemService.getAll());
    return newItem;
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<Item>) => {
    const updated = itemService.update(id, updates);
    setItems(itemService.getAll());
    return updated;
  }, []);

  const deleteItem = useCallback((id: string) => {
    const success = itemService.delete(id);
    if (success) {
      setItems(itemService.getAll());
    }
    return success;
  }, []);

  const getItemById = useCallback((id: string) => {
    return itemService.getById(id);
  }, []);

  const getOverdueReminders = useCallback(() => {
    return itemService.getOverdueReminders();
  }, []);

  return {
    items,
    filteredItems,
    filter,
    setFilter,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getOverdueReminders
  };
};

export const useMembers = () => {
  const [members] = useState<FamilyMember[]>(memberService.getAll());

  const getCurrentMember = useCallback(() => {
    return memberService.getCurrentMember();
  }, []);

  const getMemberById = useCallback((id: string) => {
    return memberService.getById(id);
  }, []);

  return {
    members,
    getCurrentMember,
    getMemberById
  };
};

export const useTimeline = () => {
  const items = useMemo(() => {
    return itemService.getAll();
  }, []);

  const timelineData = useMemo(() => {
    const grouped = itemService.getByEra();
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
  }, [items]);

  return {
    timelineData,
    allItems: items
  };
};
