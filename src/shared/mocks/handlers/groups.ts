import { http, HttpResponse, delay } from 'msw';

import type { Group, GroupMember } from '@entities';
import type { CreateGroupPayload } from '@features/groups';

const MOCK_FRIENDS: GroupMember[] = [
  { id: '1', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: '2', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: '3', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: '4', avatar: 'https://i.pravatar.cc/40?img=4' },
  { id: '5', avatar: 'https://i.pravatar.cc/40?img=5' },
  { id: '6', avatar: 'https://i.pravatar.cc/40?img=6' },
  { id: '7', avatar: 'https://i.pravatar.cc/40?img=7' },
];

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Поход в горы',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    location: { lat: 43.3484, lng: 42.4502, address: 'Эльбрус, Россия' },
    members: [MOCK_FRIENDS[0], MOCK_FRIENDS[1], MOCK_FRIENDS[2]],
  },
  {
    id: '2',
    name: 'Байкал 2024',
    coverImage: 'https://images.unsplash.com/photo-1520637836993-5cf82df7b948?w=400',
    location: { lat: 53.5587, lng: 108.165, address: 'Байкал, Иркутская область' },
    members: [MOCK_FRIENDS[3], MOCK_FRIENDS[4]],
  },
  {
    id: '3',
    name: 'Путешествие на Алтай',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
    location: { lat: 51.9578, lng: 85.9603, address: 'Горно-Алтайск, Алтай' },
    members: [MOCK_FRIENDS[0], MOCK_FRIENDS[5], MOCK_FRIENDS[6]],
  },
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const groupsHandlers = [
  http.get(`${BASE_URL}/groups`, async () => {
    await delay(500);
    return HttpResponse.json(mockGroups);
  }),

  http.get(`${BASE_URL}/friends`, async () => {
    await delay(300);
    return HttpResponse.json(MOCK_FRIENDS);
  }),

  http.post(`${BASE_URL}/groups`, async ({ request }) => {
    await delay(800);
    const body = (await request.json()) as CreateGroupPayload;

    const newGroup: Group = {
      id: String(Date.now()),
      name: body.name,
      coverImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400',
      location: body.location,
      members: MOCK_FRIENDS.filter((f) => body.memberIds.includes(f.id)),
    };

    mockGroups.push(newGroup);
    return HttpResponse.json(newGroup, { status: 201 });
  }),
];
