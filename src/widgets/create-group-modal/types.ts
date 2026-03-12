import type { GroupLocation, GroupMember } from "@entities/group";

export interface CreateGroupFormData {
  name: string;
  coverImage: { file: File; preview: string } | null;
  location: GroupLocation;
  members: GroupMember[];
}

export interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateGroupFormData) => void;
}
