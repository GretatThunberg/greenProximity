/* eslint-disable */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AifeedbackComponent } from '@app/pages/aifeedback/aifeedback.component';

const routes: Routes = [
    { path: '', redirectTo: '/ai', pathMatch: 'full' },
    { path: 'ai', component: AifeedbackComponent},
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
