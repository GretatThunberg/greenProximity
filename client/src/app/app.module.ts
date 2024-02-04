import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayAreaComponent } from '@app/components/play-area/play-area.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppMaterialModule } from '@app/modules/material.module';
import { AppComponent } from '@app/pages/app/app.component';
import { GamePageComponent } from '@app/pages/game-page/game-page.component';
import { MainPageComponent } from '@app/pages/main-page/main-page.component';
import { MaterialPageComponent } from '@app/pages/material-page/material-page.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/home-page/homepage.component';
import { MainscreenComponent } from './components/main-screen/main-screen.component';
import { StatsComponent } from './components/stats/stats.component';
import { AifeedbackComponent } from './pages/aifeedback/aifeedback.component';
import { MapMainComponent } from './pages/map-main/map-main.component';

/**
 * Main module that is used in main.ts.
 * All automatically generated components will appear in this module.
 * Please do not move this module in the module folder.
 * Otherwise Angular Cli will not know in which module to put new component
 */
@NgModule({
    declarations: [
        AppComponent,
        GamePageComponent,
        MainPageComponent,
        MaterialPageComponent,
        PlayAreaComponent,
        SidebarComponent,
        AifeedbackComponent,
        StatsComponent,
        MapMainComponent,
        HomepageComponent,
        HeaderComponent,
        MainscreenComponent,
    ],
    imports: [
        AppMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AuthModule.forRoot({
            domain: 'dev-0fpf68oa14husfm0.us.auth0.com',
            clientId: 'Ci4nLDbaVZc6d0LbyJquOodvo8JImrCf',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            authorizationParams: { redirect_uri: 'http://localhost:4200/#/ai' },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
