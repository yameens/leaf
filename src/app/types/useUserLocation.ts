"use client";

import { useEffect, useState } from "react";

type GeoState = 
    | { status: "idle" | "loading"; coords: null; error: null }
    | { status: "success"; coords: { lat : number, lon : number }; error: null }
    | { status: "error"; coords: null; error: GeolocationPositionError | string };

export function useUserLocation(askImmediately = true) {
    const [state, setState] = useState<GeoState>({ status: "idle", coords: null, error: null});

    const request = () => {
        if (!("geolocation" in navigator)) {
            setState({ status: "error", coords: null, error: "Geolocation not supported."});
            return;
        }
        setState({ status: "loading", coords: null, error: null});
        
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setState({ status: "success", coords: { lat: pos.coords.latitude, lon: pos.coords.longitude }, error: null});
            },
            (err) => {
                setState({ status: "error", coords: null, error: err});
            },
            {
                enableHighAccuracy: true,
                timeout: 10_000,
                maximumAge: 60_000,
            }
        );
    };
    /* understand how useEffect is used in this scenerio, what askImmediately does, and how information is exported */

    useEffect(() => {
        if (askImmediately) request();
    }, [askImmediately]);

    return { ...state, request };
}
