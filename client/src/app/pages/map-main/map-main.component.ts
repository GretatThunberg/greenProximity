/* eslint-disable */

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const google: any;
@Component({
    selector: 'app-map-main',
    templateUrl: './map-main.component.html',
    styleUrls: ['./map-main.component.scss'],
})
export class MapMainComponent implements OnInit, AfterViewInit {
    map: any;
    marker: any;
    @ViewChild('mapElement') mapElement: any;
    @ViewChild('mapSearchField') searchField: ElementRef;
    constructor() {}

    ngAfterViewInit(): void {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 14,
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
        // Your custom action logic here
        console.log('Processing location:', latitude, longitude);
    }
}
