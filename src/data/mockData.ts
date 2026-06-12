import { Item, FamilyMember } from '../types';

export const mockItems: Item[] = [
  {
    id: '1',
    name: '老式缝纫机',
    era: '1970-1990',
    origin: '母亲结婚时的嫁妆',
    location: '客厅角落',
    relatedPerson: '奶奶',
    story: '这台缝纫机是奶奶当年用布票换了三年的工资买下的。小时候，我最喜欢听它发出的哒哒声，那是家里最温暖的背景音乐。奶奶用它为我们全家缝制了新三年的新衣裳，每一针每一线都缝进了的爱。',
    mainImage: 'https://picsum.photos/id/160/400/400',
    detailImages: [
      'https://picsum.photos/id/160/400/400',
      'https://picsum.photos/id/161/400/400',
      'https://picsum.photos/id/162/400/400'
    ],
    damageLevel: 'light',
    viewPermission: 'family',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01',
    createdBy: '1',
    lastReviewDate: '2024-06-01',
    nextReviewDate: '2024-12-01',
    room: 'livingRoom',
    familyMembers: ['1', '2'],
    comments: [
      {
        id: 'c1',
        memberId: '2',
        memberName: '爸爸',
        content: '这台缝纫机还能用呢，奶奶的手艺真好',
        createdAt: '2024-06-02'
      }
    ]
  },
  {
    id: '2',
    name: '全家福照片',
    era: '1990-2010',
    origin: '1998年春节合影',
    location: '书房相框',
    relatedPerson: '全家人',
    story: '这张照片是1998年春节拍的，那年是爷爷七十大寿。照片里全家老小济济一堂，爷爷坐在中间，笑得合不拢嘴。可惜爷爷已经不在了，每次看到这张照片，都会想起他爽朗的笑声。',
    mainImage: 'https://picsum.photos/id/64/400/400',
    detailImages: [
      'https://picsum.photos/id/64/400/400'
    ],
    damageLevel: 'none',
    viewPermission: 'all',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
    createdBy: '1',
    lastReviewDate: '2024-06-10',
    nextReviewDate: '2024-12-10',
    room: 'study',
    familyMembers: ['1', '2', '3', '4'],
    comments: []
  },
  {
    id: '3',
    name: '老式座钟',
    era: '1950-1970',
    origin: '太爷爷留下的',
    location: '客厅',
    relatedPerson: '太爷爷',
    story: '这座钟是太爷爷年轻时从德国带回来的，已经走过了近百年的时光。小时候我常常盯着它看，想象着太爷爷当年带着它从很远的地方回来的情景。现在它虽然走得慢了，但我们舍不得修，就让它按自己的节奏继续走下去。',
    mainImage: 'https://picsum.photos/id/1082/400/400',
    detailImages: [
      'https://picsum.photos/id/1082/400/400',
      'https://picsum.photos/id/1084/400/400'
    ],
    damageLevel: 'medium',
    viewPermission: 'family',
    createdAt: '2024-03-05',
    updatedAt: '2024-05-20',
    createdBy: '2',
    lastReviewDate: '2024-05-20',
    nextReviewDate: '2024-11-20',
    room: 'livingRoom',
    familyMembers: ['1', '2'],
    comments: [
      {
        id: 'c2',
        memberId: '3',
        memberName: '妈妈',
        content: '这钟声特别好听，希望它能一直走下去',
        createdAt: '2024-05-21'
      }
    ]
  },
  {
    id: '4',
    name: '木制首饰盒',
    era: '1970-1990',
    origin: '父亲出差带回',
    location: '卧室梳妆台',
    relatedPerson: '妈妈',
    story: '这个首饰盒是爸爸第一次出差时给妈妈带的礼物。虽然不是贵重的东西，但妈妈特别喜欢，一直珍藏着。盒子上的雕花是手工刻的，每一朵花都栩栩如生。',
    mainImage: 'https://picsum.photos/id/225/400/400',
    detailImages: [
      'https://picsum.photos/id/225/400/400',
      'https://picsum.photos/id/230/400/400'
    ],
    damageLevel: 'none',
    viewPermission: 'private',
    createdAt: '2024-04-10',
    updatedAt: '2024-04-10',
    createdBy: '3',
    lastReviewDate: '2024-07-01',
    nextReviewDate: '2025-01-01',
    room: 'bedroom',
    familyMembers: ['3'],
    comments: []
  },
  {
    id: '5',
    name: '旧式自行车',
    era: '1980-1990',
    origin: '爸爸上班的代步工具',
    location: '储藏室',
    relatedPerson: '爸爸',
    story: '这辆自行车陪伴爸爸度过了二十多年的上班时光。小时候放学，爸爸经常骑着它来接我，我就坐在后座上，抱着爸爸的腰，觉得特别安心。现在虽然不骑了，但一直舍不得处理掉。',
    mainImage: 'https://picsum.photos/id/326/400/400',
    detailImages: [
      'https://picsum.photos/id/326/400/400',
      'https://picsum.photos/id/401/400/400'
    ],
    damageLevel: 'heavy',
    viewPermission: 'family',
    createdAt: '2024-05-01',
    updatedAt: '2024-06-15',
    createdBy: '2',
    lastReviewDate: '2024-06-15',
    nextReviewDate: '2024-09-15',
    room: 'storage',
    familyMembers: ['1', '2'],
    comments: []
  },
  {
    id: '6',
    name: '老式收音机',
    era: '1970-1990',
    origin: '外公的心爱之物',
    location: '客厅',
    relatedPerson: '外公',
    story: '外公平时最爱听广播新闻，每天早上都要听一会儿。这个收音机是舅舅当年送给外公的，外公一直很珍惜。现在外公耳朵不太好使了，但收音机还在，偶尔打开听听，也能让他想起那些听广播的日子。',
    mainImage: 'https://picsum.photos/id/787/400/400',
    detailImages: [
      'https://picsum.photos/id/787/400/400',
      'https://picsum.photos/id/3/400/400'
    ],
    damageLevel: 'light',
    viewPermission: 'family',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01',
    createdBy: '4',
    lastReviewDate: '2024-08-01',
    nextReviewDate: '2025-02-01',
    room: 'livingRoom',
    familyMembers: ['1', '4'],
    comments: []
  },
  {
    id: '7',
    name: '老式留声机',
    era: 'before1950',
    origin: '祖上传下来的',
    location: '书房',
    relatedPerson: '祖辈',
    story: '这是我们家最老的物件之一了，据说是曾祖父年轻时置办的。虽然现在很少用它放唱片了，但每次家庭聚会，大家都会让它响起来，播放一些老歌，特别有氛围。',
    mainImage: 'https://picsum.photos/id/1015/400/400',
    detailImages: [
      'https://picsum.photos/id/1015/400/400',
      'https://picsum.photos/id/1018/400/400',
      'https://picsum.photos/id/1036/400/400'
    ],
    damageLevel: 'medium',
    viewPermission: 'all',
    createdAt: '2024-01-01',
    updatedAt: '2024-04-15',
    createdBy: '1',
    lastReviewDate: '2024-04-15',
    nextReviewDate: '2024-10-15',
    room: 'study',
    familyMembers: ['1', '2', '3', '4'],
    comments: []
  },
  {
    id: '8',
    name: '陶瓷茶具',
    era: '1990-2010',
    origin: '乔迁之喜礼物',
    location: '客厅茶几',
    relatedPerson: '全家',
    story: '这套茶具是我们搬进新家时，姑姑送的乔迁礼物。十几年了，每次家里来客人，我们都会用这套茶具泡茶招待。茶具上印着花开富贵的图案，颜色也一直很鲜艳。',
    mainImage: 'https://picsum.photos/id/431/400/400',
    detailImages: [
      'https://picsum.photos/id/431/400/400',
      'https://picsum.photos/id/570/400/400'
    ],
    damageLevel: 'none',
    viewPermission: 'all',
    createdAt: '2024-02-14',
    updatedAt: '2024-02-14',
    createdBy: '3',
    lastReviewDate: '2024-07-15',
    nextReviewDate: '2025-01-15',
    room: 'livingRoom',
    familyMembers: ['1', '2', '3'],
    comments: []
  },
  {
    id: '9',
    name: '手工织毛衣',
    era: '1980-2000',
    origin: '奶奶亲手织的',
    location: '卧室衣柜',
    relatedPerson: '奶奶',
    story: '这件毛衣是奶奶在我小时候织的，虽然现在已经穿不下了，但我一直珍藏着。上面有可爱的小熊图案，是奶奶一针一线勾出来的。现在奶奶年纪大了，眼睛也花了，再也织不动了。',
    mainImage: 'https://picsum.photos/id/103/400/400',
    detailImages: [
      'https://picsum.photos/id/103/400/400',
      'https://picsum.photos/id/119/400/400'
    ],
    damageLevel: 'light',
    viewPermission: 'family',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    createdBy: '1',
    lastReviewDate: '2024-09-01',
    nextReviewDate: '2025-03-01',
    room: 'bedroom',
    familyMembers: ['1', '2'],
    comments: []
  },
  {
    id: '10',
    name: '老式打字机',
    era: '1970-1990',
    origin: '爸爸写作的工具',
    location: '书房书桌',
    relatedPerson: '爸爸',
    story: '爸爸年轻时是个文学青年，这台打字机陪他写了好多文章和小说。虽然后来有了电脑，但爸爸还是舍不得丢掉这台老伙计。现在它偶尔还能用，打出来的字特别有感觉。',
    mainImage: 'https://picsum.photos/id/1/400/400',
    detailImages: [
      'https://picsum.photos/id/1/400/400',
      'https://picsum.photos/id/2/400/400',
      'https://picsum.photos/id/3/400/400'
    ],
    damageLevel: 'light',
    viewPermission: 'family',
    createdAt: '2024-04-25',
    updatedAt: '2024-04-25',
    createdBy: '2',
    lastReviewDate: '2024-10-01',
    nextReviewDate: '2025-04-01',
    room: 'study',
    familyMembers: ['1', '2'],
    comments: []
  }
];

export const mockMembers: FamilyMember[] = [
  {
    id: '1',
    name: '小明',
    avatar: 'https://picsum.photos/id/64/200/200',
    relation: '本人',
    joinDate: '2024-01-01',
    itemCount: 5
  },
  {
    id: '2',
    name: '爸爸',
    avatar: 'https://picsum.photos/id/91/200/200',
    relation: '父亲',
    joinDate: '2024-01-01',
    itemCount: 4
  },
  {
    id: '3',
    name: '妈妈',
    avatar: 'https://picsum.photos/id/177/200/200',
    relation: '母亲',
    joinDate: '2024-01-01',
    itemCount: 3
  },
  {
    id: '4',
    name: '爷爷',
    avatar: 'https://picsum.photos/id/338/200/200',
    relation: '祖父',
    joinDate: '2024-02-15',
    itemCount: 1
  }
];
