/* eslint-disable */

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesService, Service } from '@app/interfaces/Service';
import { SharedServiceService } from '@app/services/shared-service.service';
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
    constructor(private sharedService: SharedServiceService) {}
    private isDebouncing: boolean = false;
    ngAfterViewInit(): void {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: { lat: 45.630001, lng: -73.519997 },
            zoom: 11,
        });

        const searchBox = new google.maps.places.SearchBox(this.searchField.nativeElement);
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement);
        searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place: { geometry: { location: any; viewport: any } }) => {
                if (!place.geometry || !place.geometry.location) {
                    return;
                }
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds(place.geometry.location);
                }
            });
            this.map.fitBounds(bounds);
        });

        google.maps.event.addListener(this.map, 'click', (event: any) => {
            this.handleMapClick(event.latLng);
        });
    }

    ngOnInit(): void {}

    handleMapClick(latLng: any): void {
        // Clear existing marker

        if (this.isDebouncing) {
            console.log('Please wait a moment before clicking again.');
            return;
        }

        this.isDebouncing = true;

        setTimeout(() => this.isDebouncing = false, 9000);
        this.listService = [];
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
        this.drawSearchRadiusCircle(latLng.lat(), latLng.lng(), 800);
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
        const placeTypes = ['restaurant', 'hospital', 'school', 'bus_station', 'park', 'grocery_store', 'doctor', 'pharmacy', 'gym']; // Define place types
        //let promises = placeTypes.map(placeType => this.searchNearbyPlaces(latitude, longitude, placeType));

        let promiseChain = Promise.resolve();

        for (const placeType of placeTypes) {
            promiseChain = promiseChain.then(() => this.searchNearbyPlaces(latitude, longitude, placeType));
        }

        promiseChain.then(() => {
            this.sharedService.traiterData(this.listService);
        });
        
        // Promise.all(promises).then(() => {
        //     this.sharedService.traiterData(this.listService);
        // }).catch(error => {
        //     console.error('Error fetching places:', error);
        // });
    }

    searchNearbyPlaces(latitude: number, longitude: number, placeType: string): Promise<void> {
        return new Promise((resolve) => {
            if (google.maps.places) {
                const placesService = new google.maps.places.PlacesService(this.map);
                const request = {
                    location: new google.maps.LatLng(latitude, longitude),
                    radius: 800,
                    type: placeType,
                };
    
                placesService.nearbySearch(request, (results: any[], status: any) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        this.processNearbyPlaces(results, placeType);
                    } else {
                        console.error(`Nearby Search failed for ${placeType}:`, status);
                        this.listService.push({ serviceName: placeType, length: 0, places: [] });
                    }
                    resolve(); 
                });
            } else {
                console.error('google.maps.places not available');
                this.listService.push({ serviceName: placeType, length: 0, places: [] });
                resolve();
            }
        });
    }

    public circle: any;

    drawSearchRadiusCircle(latitude: number, longitude: number, radius: number): void {
        // Clear existing circle
        if (this.circle) {
            this.circle.setMap(null);
        }

        // Draw a new circle on the map
        this.circle = new google.maps.Circle({
            center: { lat: latitude, lng: longitude },
            radius: radius,
            map: this.map,
            fillColor: '#ADD8E6', // Light blue fill color
            strokeColor: '#0000FF', // Dark blue border color
            strokeWeight: 1,
            clickable: false,
        });
    }

    processNearbyPlaces(places: any[], placeType: string): void {
        let newService: Service = { serviceName: placeType, length: places.length, places: [] };

        places.forEach((place) => {
            let newPlace: PlacesService = { name: place.name, location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } };
            newService.places.push(newPlace);
        });
        this.listService.push(newService);
    }
}
