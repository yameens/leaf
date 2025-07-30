"use client";
import { useEffect, useState } from 'react';
import { Restroom } from '@/app/types/Restroom';
import { getRestrooms } from '@/app/libraries/getRestroom';
import { nearestRestroom } from '@/app/libraries/nearest';
import { useUserLocation } from '@/types/useUserLocation';

export default function NearestRestroomBlock() {
    const [restrooms, setRestrooms] = useState<Restroom[]>([]);
    const [top5, setTop5] = useState<(Restroom & { DistanceMile: number })[]>([]);
    const { status, coords, error, request } = useUserLocation(false);

    useEffect( () => {
        getRestrooms().then(setRestrooms).catch(console.error);
    },[]);

    useEffect( () => {
        if (coords && restrooms.length > 0){
           const res = nearestRestroom(coords.lat, coords.lon, restrooms, 5); 
           setTop5(res);
        }
    }, [coords, restrooms]);

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <button onClick={request}> share my location </button>
            </div>
            <NearestSection
            status = {status}
            error = {error}
            coords = {coords}
            top5 = {top5}
            />
        </div>
    )

    type NearestSectionProps = {
        status: "idle" | "loading" | "error" | "success";
        error: GeolocationPositionError | string | null;
        coords: { lat: number, lon: number } | null;
        top5: (Restroom & {DistanceMile: number})[];
    }

    function NearestSection ({status, coords, error, top5}: NearestSectionProps){
        if (status === "idle"){
            return <p> click use location to locate nearby restrooms. </p>
        }
        if (status === "loading"){
            return(
                <p> loading nearby restrooms </p>
            )
        }
        if (status === "error"){
            return(
                <p> failed retrieving nearby restrooms. you can still search manually. </p>
            )
        }
        if (status === "success" && coords && top5.length === 0 ){
            return (
                <p> no restrooms nearby. </p>
            )
        }
    }

}