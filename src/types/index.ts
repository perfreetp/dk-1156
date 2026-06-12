export interface Item {
  id: string;
  name: string;
  era: string;
  origin: string;
  location: string;
  relatedPerson: string;
  story: string;
  mainImage: string;
  detailImages: string[];
  damageLevel: 'none' | 'light' | 'medium' | 'heavy';
  viewPermission: 'all' | 'family' | 'private';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastReviewDate: string;
  nextReviewDate: string;
  room: string;
  familyMembers: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  memberId: string;
  memberName: string;
  content: string;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  relation: string;
  phone?: string;
  joinDate: string;
  itemCount: number;
}

export interface ReviewReminder {
  itemId: string;
  itemName: string;
  nextReviewDate: string;
  isOverdue: boolean;
}

export interface FilterOptions {
  era?: string;
  room?: string;
  damageLevel?: string;
  searchText?: string;
}

export const ERA_OPTIONS = [
  { label: '1950前', value: 'before1950' },
  { label: '1950-1970', value: '1950-1970' },
  { label: '1970-1990', value: '1970-1990' },
  { label: '1990-2010', value: '1990-2010' },
  { label: '2010后', value: 'after2010' }
];

export const ROOM_OPTIONS = [
  { label: '客厅', value: 'livingRoom' },
  { label: '卧室', value: 'bedroom' },
  { label: '书房', value: 'study' },
  { label: '厨房', value: 'kitchen' },
  { label: '储藏室', value: 'storage' },
  { label: '其他', value: 'other' }
];

export const DAMAGE_OPTIONS = [
  { label: '完好', value: 'none', color: 'success' },
  { label: '轻微', value: 'light', color: 'warning' },
  { label: '中等', value: 'medium', color: 'accent' },
  { label: '严重', value: 'heavy', color: 'error' }
];

export const VIEW_PERMISSION_OPTIONS = [
  { label: '所有人可见', value: 'all' },
  { label: '仅家人可见', value: 'family' },
  { label: '仅自己可见', value: 'private' }
];
