'use client';

import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from 'react';
import { getRestrooms } from '@/app/libraries/getRestroom';
import type { Restroom } from "@/app/types/Restroom";

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJvZ3JhbXlhbSIsImEiOiJjbWNwaWdjbHYwNnB2MmtweDFxaW01a2x4In0.-40m_XC5HdQrS6e8ONcLWA';

export default function BathroomMap() {
    const [restrooms, setRestrooms] = useState<Restroom[]>([]);
    const [viewState, setViewState] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 10,
    });

    useEffect(() => {
        getRestrooms().then(setRestrooms);
    }, []);

    return (
        <div className="w-full h-full">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={viewState}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={(evt: any) => setViewState(evt.viewState)}>
                {/* example static marker */}
                <Marker latitude={37.7749} longitude={-122.4194} color="red">
                    <img
                        src="cleantoilet.png"
                        alt="Shop"
                        style={{ width: 70, height: 50}}
                    />
                </Marker>
                {/* render markers for each & every restroom */}
                {restrooms.map((toilet) => (
                    <Marker
                        key={toilet.id}
                        latitude={toilet.lat}
                        longitude={toilet.lon}
                        color="red"
                    >
                        <img
                            src="cleantoilet.png"
                            alt={toilet.name}
                            style={{ width: 70, height: 50 }}
                        />
                    </Marker>
                ))}
            </Map>
        </div>
    );
}