export interface Restroom{
    id: number;
    lat: number;
    lon: number;
    name: string;
    wheelchair: boolean | null;
    unisex: boolean | null;
    address?: string;
    rating?: number;

}