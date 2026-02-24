export interface GroupLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface GroupMember {
  id: string;
  avatar: string;
}

export interface Group {
  id: string;
  name: string;
  coverImage: string;
  location: GroupLocation;
  members: GroupMember[];
}
