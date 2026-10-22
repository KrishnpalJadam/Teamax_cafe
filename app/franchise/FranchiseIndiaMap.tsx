"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./FranchiseIndiaMap.css";
import { getCentres } from "../lib/api";

type MapLocation = {
    id: number | string;
    name: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
};

const INDIA_CENTER: [number, number] = [22.5, 79.0];
const INDIA_ZOOM = 5;

const locationIcon = L.divIcon({
    className: "tm-map-location-icon",
    html: `
    <div class="tm-map-marker">
      <span class="tm-map-marker-pulse"></span>
      <span class="tm-map-marker-dot"></span>
    </div>
  `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

export default function FranchiseIndiaMap() {
    const [locations, setLocations] = useState<MapLocation[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;

        getCentres()
            .then((data: any[]) => {
                if (!mounted || !Array.isArray(data)) return;

                const formatted: MapLocation[] = data
                    .filter(
                        (item) =>
                            typeof item?.latitude === "number" &&
                            typeof item?.longitude === "number"
                    )
                    .map((item) => ({
                        id: item.id,
                        name: item.name || item.city,
                        city: item.city || "",
                        state: item.state || "",
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }));

                setLocations(formatted);
            })
            .catch((err) => {
                console.error("Centres API error:", err);

                if (mounted) {
                    setError(true);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    const mapCenter = useMemo<[number, number]>(() => {
        if (locations.length === 0) {
            return INDIA_CENTER;
        }

        const avgLat =
            locations.reduce((sum, item) => sum + item.latitude, 0) /
            locations.length;

        const avgLng =
            locations.reduce((sum, item) => sum + item.longitude, 0) /
            locations.length;

        return [avgLat, avgLng];
    }, [locations]);

    const mapZoom = useMemo(() => {
        if (locations.length === 0) return INDIA_ZOOM;
        if (locations.length === 1) return 11;

        return 6;
    }, [locations]);

    if (error) {
        return (
            <div className="tm-fc-map-error">
                Franchise locations could not be loaded right now.
            </div>
        );
    }

    return (
        <div className="tm-fc-real-map">
            <span className="tm-fc-map-tag">Growing Across India</span>

            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={false}
                className="tm-fc-leaflet-map"
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                    maxZoom={18}
                />

                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.latitude, location.longitude]}
                        icon={locationIcon}
                    >
                        <Popup>
                            <div className="tm-map-popup">
                                <strong>{location.name}</strong>
                                <span>
                                    {location.city}
                                    {location.state ? `, ${location.state}` : ""}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="tm-fc-map-legend">
                <span className="tm-fc-legend-dot" />

                <span>
                    {locations.length} Franchise Location
                    {locations.length === 1 ? "" : "s"}
                </span>
            </div>
        </div>
    );
}