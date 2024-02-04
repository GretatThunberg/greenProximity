/* eslint-disable */

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesService, Service } from '@app/interfaces/Service';
declare const google: any;
@Component({
    selector: 'app-map-main',
    templateUrl: './map-main.component.html',
    styleUrls: ['./map-main.component.scss'],
})
export class MapMainComponent implements OnInit, AfterViewInit {
    map: any;
    marker: any;
    listService: Service[] = [];
    @ViewChild('mapElement') mapElement: any;
    @ViewChild('mapSearchField') searchField: ElementRef;
    constructor() {}

    ngAfterViewInit(): void {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: { lat: 45.630001, lng: -73.519997 },
            zoom: 11,
        });

        google.maps.event.addListener(this.map, 'click', (event: any) => {
            this.handleMapClick(event.latLng);
        });
    }

    ngOnInit(): void {}

    handleMapClick(latLng: any): void {
        // Clear existing marker
        if (this.marker) {
            this.marker.setMap(null);
        }

        // Create a new marker at the clicked location
        this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: 'Pinned Location',
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red marker icon
        });

        // You can execute your custom action here with the coordinates
        this.processClickedLocation(latLng.lat(), latLng.lng());
    }

    // Method to handle address input changes
    handleAddressChange(address: string): void {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results: any, status: any) => {
            if (status === 'OK' && results && results.length > 0) {
                const location = results[0].geometry.location;
                this.handleMapClick(location);
            } else {
                console.error('Geocoding failed:', status);
            }
        });
    }

    // Method to execute custom action with coordinates
    processClickedLocation(latitude: number, longitude: number): void {
        console.log('Processing location:', latitude, longitude);

        // Define types of places you want to search for
        const placeTypes = ['restaurant', 'hospital', 'school', 'bus_station', 'parc', 'grocery_store', 'health clinic', 'drug_store', 'gym'];

        // Iterate over each place type and make a Nearby Search request
        placeTypes.forEach((placeType) => {
            this.searchNearbyPlaces(latitude, longitude, placeType);
        });
    }

    searchNearbyPlaces(latitude: number, longitude: number, placeType: string): void {
        // Ensure the PlacesService is available
        if (google.maps.places) {
            const placesService = new google.maps.places.PlacesService(this.map);

            // Define the request parameters for the Nearby Search request
            const request = {
                location: new google.maps.LatLng(latitude, longitude),
                radius: 1000, // 1km radius
                type: placeType,
            };

            // Perform the Nearby Search request
            placesService.nearbySearch(request, (results: any[], status: any) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Process the results (e.g., display markers on the map)
                    this.processNearbyPlaces(results, placeType);
                    console.log(this.listService);
                } else {
                    console.error(`Nearby Search failed for ${placeType}:`, status);
                }
            });
        } else {
            console.error('google.maps.places not available');
        }
    }

    processNearbyPlaces(places: any[], placeType: string): void {
        let newService: Service = { serviceName: placeType, length: places.length, places: [] };

        console.log(`Nearby ${placeType}s:`);
        places.forEach((place) => {
            console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng());
            let newPlace: PlacesService = { name: place.name, location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } };
            newService.places.push(newPlace);
        });
        this.listService.push(newService);
    }
}
