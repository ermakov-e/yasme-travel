export interface Location {
  id: string;
  groupId: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  createdBy: string;
  photosCount: number;
}
