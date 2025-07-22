'use client';

import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJvZ3JhbXlhbSIsImEiOiJjbWNwaWdjbHYwNnB2MmtweDFxaW01a2x4In0.-40m_XC5HdQrS6e8ONcLWA';

export default function BathroomMap() {
    const [viewState, setViewState] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 10,
    });
    
    return (
        <div style={{ width: '100%', height: '400px'}}>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={viewState}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={(evt: any) => setViewState(evt.viewState)}>
                <Marker latitude={37.7749} longitude={-122.4194} color="red">
                    <img
                        src="/matcha-icon.png"
                        alt="Shop"
                        style={{ width: 30, height: 30}}
                        />
    
                </Marker>
                </Map>
        </div>
    )
}