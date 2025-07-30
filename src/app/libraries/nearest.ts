import { haversineDistance } from "./geo";
import { Restroom } from "@/app/types/Restroom";

export function nearestRestroom(
    userLat: number,
    userLon: number,
    restrooms: Restroom[],
    k = 5
) {
    return restrooms
        .map((r) => ({
            ...r, // Include all original restroom properties
            DistanceMile: haversineDistance(userLat, userLon, r.lat, r.lon, "mi"),
        }))
        .sort((a, b) => a.DistanceMile - b.DistanceMile)
        .slice(0, k);
}

