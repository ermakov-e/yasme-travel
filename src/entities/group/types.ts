export interface GroupMember {
  id: string;
  avatar: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  createdAt: string;
  createdBy: string;
  members: GroupMember[];
}
