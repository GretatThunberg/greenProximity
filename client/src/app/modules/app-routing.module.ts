/* eslint-disable */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from '@app/pages/about-us/about-us.component';
import { AifeedbackComponent } from '@app/pages/aifeedback/aifeedback.component';
import { MainPageComponent } from '@app/pages/main-page/main-page.component';
import { OurmissionComponent } from '@app/pages/our-mission/our-mission.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainPageComponent },
    { path: 'ai', component: AifeedbackComponent },
    { path: 'our-mission', component: OurmissionComponent },
    { path: 'about-us', component: AboutusComponent },
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
