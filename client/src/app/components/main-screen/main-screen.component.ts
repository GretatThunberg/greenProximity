import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss'],
})
export class MainscreenComponent implements OnInit {
    isMuted = true; // Set to true if you want the video to be initially muted
    videoSource = '/../../assets/video.mp4';
    // Inject the authentication service into your component through the constructor
    constructor(public auth: AuthService) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
    ngOnInit(): void {}
}
