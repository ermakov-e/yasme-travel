import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GeocodingResponse {
  response: {
    GeoObjectCollection: {
      featureMember: Array<{
        GeoObject: {
          Point: {
            pos: string;
          };
          metaDataProperty: {
            GeocoderMetaData: {
              Address: {
                formatted: string;
              };
            };
          };
        };
      }>;
    };
  };
}

export const autocompleteApi = createApi({
  reducerPath: 'autocompleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://geocode-maps.yandex.ru/1.x/',
  }),
  tagTypes: ['AddressSuggestions'],
  endpoints: (builder) => ({
    searchAddress: builder.query<GeocodingResponse, string>({
      query: (query) => ({
        url: '',
        params: {
          apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
          geocode: query,
          format: 'json',
          results: 5,
        },
      }),
      providesTags: ['AddressSuggestions'],
    }),
    reverseGeocode: builder.query<GeocodingResponse, { lat: number; lng: number }>({
      query: ({ lat, lng }) => ({
        url: '',
        params: {
          apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
          geocode: `${lng},${lat}`,
          format: 'json',
          results: 1,
        },
      }),
    }),
  }),
});

export const { useSearchAddressQuery, useLazyReverseGeocodeQuery } = autocompleteApi;
