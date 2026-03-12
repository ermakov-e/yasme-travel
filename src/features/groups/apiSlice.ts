import { api } from '@shared/api/apiSlice';
import type { Group, GroupMember } from '@entities';
import type { GroupLocation } from '@entities';

export interface CreateGroupPayload {
  name: string;
  location: GroupLocation;
  memberIds: string[];
}

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<Group[], void>({
      query: () => '/groups',
      providesTags: ['Group'],
    }),

    getFriends: builder.query<GroupMember[], void>({
      query: () => '/friends',
      providesTags: ['User'],
    }),

    createGroup: builder.mutation<Group, CreateGroupPayload>({
      query: (data) => ({
        url: '/groups',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Group'],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetFriendsQuery,
  useCreateGroupMutation,
} = groupsApi;
