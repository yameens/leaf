export function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: "km" | "mi" = "mi",
): number {
    const R = unit === "km" ? 6371 : 3958.8;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) ** 2 + 
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    
}

function toRad(v : number){
    return (v * Math.PI) / 180;
}