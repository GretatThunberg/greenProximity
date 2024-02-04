/* eslint-disable */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AifeedbackComponent } from '@app/pages/aifeedback/aifeedback.component';
import { MainPageComponent } from '@app/pages/main-page/main-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainPageComponent },
    { path: 'ai', component: AifeedbackComponent},
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
