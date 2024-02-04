/* eslint-disable */

export interface Location {
    lat: number;
    lng: number;
}
export interface PlacesService {
    name: string;
    location: Location;
}
export interface Service {
    serviceName: string;
    length: number;
    places: PlacesService[];
}
