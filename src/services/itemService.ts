import { Item, FamilyMember, FilterOptions } from '../types';
import { mockItems, mockMembers } from '../data/mockData';

class ItemService {
  private items: Item[] = mockItems;

  getAll(): Item[] {
    return [...this.items];
  }

  getById(id: string): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  getFiltered(filter: FilterOptions): Item[] {
    let result = [...this.items];

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
  }

  getByEra(): Record<string, Item[]> {
    const grouped: Record<string, Item[]> = {};
    this.items.forEach(item => {
      if (!grouped[item.era]) {
        grouped[item.era] = [];
      }
      grouped[item.era].push(item);
    });
    return grouped;
  }

  getOverdueReminders(): Item[] {
    const today = new Date().toISOString().split('T')[0];
    return this.items.filter(item => item.nextReviewDate <= today);
  }

  create(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    this.items.unshift(newItem);
    return newItem;
  }

  update(id: string, updates: Partial<Item>): Item | undefined {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return undefined;

    this.items[index] = {
      ...this.items[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    return this.items[index];
  }

  delete(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  addComment(itemId: string, memberId: string, memberName: string, content: string): boolean {
    const item = this.getById(itemId);
    if (!item) return false;

    item.comments.push({
      id: Date.now().toString(),
      memberId,
      memberName,
      content,
      createdAt: new Date().toISOString().split('T')[0]
    });
    return true;
  }
}

class MemberService {
  private members: FamilyMember[] = mockMembers;

  getAll(): FamilyMember[] {
    return [...this.members];
  }

  getById(id: string): FamilyMember | undefined {
    return this.members.find(member => member.id === id);
  }

  getCurrentMember(): FamilyMember {
    return this.members[0];
  }
}

export const itemService = new ItemService();
export const memberService = new MemberService();
