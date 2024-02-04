import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(
        public auth: AuthService,
        private router: Router,
    ) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
    ngOnInit(): void {}

    openCoffeePage(): void {
        window.open('https://www.buymeacoffee.com/greenproximity', '_blank');
    }

    sendEmail(): void {
        window.location.href = 'mailto:yacbarka@gmail.com';
    }

    redirectToAboutUs(): void {
        this.router.navigate(['/about-us']);
    }

    redirectToMission(): void {
        this.router.navigate(['/our-mission']);
    }

    redirectToHome(): void {
        this.router.navigate(['/home']);
    }
}
