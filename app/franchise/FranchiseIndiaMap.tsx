
"use client";

import {
    MapContainer,
    TileLayer,
    CircleMarker,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./FranchiseIndiaMap.css";

// India map settings
const INDIA_CENTER: [number, number] = [22.5, 79.0];
const INDIA_ZOOM = 5;

// Number of static decorative dots
const STATIC_DOT_COUNT = 300;

// Approximate outline of mainland India + North-East
const INDIA_BOUNDARY: [number, number][] = [
    [35.5, 74.5],
    [35.8, 77.8],
    [34.5, 79.5],
    [32.5, 78.8],
    [31.0, 79.5],
    [29.5, 80.2],
    [28.8, 88.2],
    [27.8, 92.0],
    [28.2, 97.3],
    [26.5, 97.4],
    [24.5, 95.1],
    [23.5, 94.0],
    [22.0, 93.5],
    [22.0, 92.0],
    [24.0, 89.8],
    [22.5, 88.0],
    [21.5, 87.5],
    [20.5, 86.5],
    [19.0, 85.5],
    [17.5, 84.8],
    [16.5, 83.5],
    [15.0, 80.5],
    [13.0, 80.3],
    [11.5, 79.8],
    [9.0, 79.5],
    [8.0, 77.5],
    [8.3, 76.5],
    [10.0, 76.0],
    [12.5, 74.8],
    [14.0, 74.0],
    [16.0, 73.5],
    [18.0, 72.8],
    [20.0, 70.8],
    [22.0, 69.5],
    [23.5, 68.5],
    [24.5, 68.5],
    [25.5, 70.0],
    [26.5, 70.5],
    [28.0, 71.5],
    [30.0, 72.5],
    [32.0, 74.0],
];

// Check whether a coordinate falls inside India's approximate boundary
function isInsideIndia(lat: number, lng: number) {
    let inside = false;

    for (
        let i = 0, j = INDIA_BOUNDARY.length - 1;
        i < INDIA_BOUNDARY.length;
        j = i++
    ) {
        const [latI, lngI] = INDIA_BOUNDARY[i];
        const [latJ, lngJ] = INDIA_BOUNDARY[j];

        const intersects =
            lngI > lng !== lngJ > lng &&
            lat <
            ((latJ - latI) * (lng - lngI)) /
            (lngJ - lngI) +
            latI;

        if (intersects) inside = !inside;
    }

    return inside;
}

// Generate repeatable static coordinates
function generateStaticDots(count: number) {
    let seed = 20261110;

    const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };

    const dots: [number, number][] = [];

    let attempts = 0;

    while (dots.length < count && attempts < count * 200) {
        attempts++;

        const lat = 8 + random() * 29;
        const lng = 68 + random() * 30;

        if (isInsideIndia(lat, lng)) {
            dots.push([lat, lng]);
        }
    }

    return dots;
}

// Static dots generated once
const STATIC_DOTS = generateStaticDots(STATIC_DOT_COUNT);

export default function FranchiseIndiaMap() {
    return (
        <div className="tm-fc-real-map">
            <span className="tm-fc-map-tag">
                Growing Across India
            </span>

            <MapContainer
                center={INDIA_CENTER}
                zoom={INDIA_ZOOM}
                scrollWheelZoom={false}
                className="tm-fc-leaflet-map"
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                    maxZoom={18}
                />

                {STATIC_DOTS.map((position, index) => (
                    <CircleMarker
                        key={index}
                        center={position}
                        radius={3.5}
                        interactive={false}
                        bubblingMouseEvents={false}
                        pathOptions={{
                            color: "#102d29",
                            weight: 1.5,
                            fillColor: "#ffd028",
                            fillOpacity: 1,
                        }}
                    />
                ))}
            </MapContainer>
        </div>
    );
}
