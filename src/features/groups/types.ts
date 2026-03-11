import type { GroupLocation, GroupMember } from '@/entities/group/types';

export interface CreateGroupFormData {
  name: string;
  coverImage: File | null;
  address: string;
  location: GroupLocation;
  members: GroupMember[];
}

export interface AddressSuggestion {
  displayText: string;
  value: string;
  lat: number;
  lng: number;
}
