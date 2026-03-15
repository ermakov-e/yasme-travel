import "leaflet/dist/leaflet.css";
import { useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { MyLocation as MyLocationIcon } from "@mui/icons-material";

import { useLazyReverseGeocodeQuery } from "@features/autocomplete-address";
import type { GroupLocation } from "@entities/group";

// Fix default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #10B981;
    border: 3px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    position: relative;
  ">
    <div style="
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid #10B981;
    "></div>
  </div>`,
  iconSize: [20, 28],
  iconAnchor: [10, 28],
});

// ─── Styled ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.grey[100]};
  }
`;

const MapInner = styled.div`
  height: 220px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 280px;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
`;

const LocateMeButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 1000;
  width: 36px;
  height: 36px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  color: ${({ theme }) => theme.colors.primary};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryBg};
  }
`;

const HintText = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing(0.75)}
    ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.background.subtle};
  text-align: center;
`;

// ─── Map event handlers ───────────────────────────────────────────────────────

interface MapClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

const MapClickHandler = ({ onMapClick }: MapClickHandlerProps) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

interface MapCenterUpdaterProps {
  location: GroupLocation | undefined;
}

const MapCenterUpdater = ({ location }: MapCenterUpdaterProps) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(
        [location.lat, location.lng],
        map.getZoom() < 13 ? 14 : map.getZoom(),
        {
          animate: true,
        },
      );
    }
  }, [location, map]);
  return null;
};

// ─── Component ────────────────────────────────────────────────────────────────

export interface LocationPickerProps {
  value?: GroupLocation;
  onChange: (location: GroupLocation) => void;
}

const DEFAULT_CENTER: [number, number] = [51.6817336083052, 39.19447660446168]; // Глина

export const LocationPicker = ({ value, onChange }: LocationPickerProps) => {
  const [triggerReverseGeocode, { isFetching }] = useLazyReverseGeocodeQuery();

  const handleMapClick = useCallback(
    async (lat: number, lng: number) => {
      try {
        const result = await triggerReverseGeocode({ lat, lng }).unwrap();
        const member = result.response.GeoObjectCollection.featureMember[0];
        const address =
          member?.GeoObject.metaDataProperty.GeocoderMetaData.Address
            .formatted ?? "";
        onChange({ lat, lng, address });
      } catch {
        // Если reverse geocoding не сработал, устанавливаем координаты без адреса
        onChange({ lat, lng });
      }
    },
    [triggerReverseGeocode, onChange],
  );

  const handleLocateMe = () => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        handleMapClick(coords.latitude, coords.longitude);
      },
      () => {
        /* permission denied — ignore */
      },
    );
  };

  const center: [number, number] = value
    ? [value.lat, value.lng]
    : DEFAULT_CENTER;

  return (
    <Wrapper data-vaul-no-drag>
      <MapInner>
        <MapContainer
          center={center}
          zoom={value ? 14 : 10}
          scrollWheelZoom
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onMapClick={handleMapClick} />
          <MapCenterUpdater location={value} />
          {value && (
            <Marker position={[value.lat, value.lng]} icon={markerIcon} />
          )}
        </MapContainer>
      </MapInner>

      {isFetching && (
        <LoadingOverlay>
          <CircularProgress size={24} />
        </LoadingOverlay>
      )}

      <LocateMeButton
        type="button"
        onClick={handleLocateMe}
        title="Определить моё местоположение"
      >
        <MyLocationIcon fontSize="small" />
      </LocateMeButton>

      <HintText>Нажмите на карту, чтобы выбрать место</HintText>
    </Wrapper>
  );
};
