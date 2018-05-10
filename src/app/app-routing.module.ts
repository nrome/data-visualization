import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataPanelOneComponent } from './components/data-panel-one/data-panel-one.component';
import { InteractiveDataComponent } from './components/interactive-data/interactive-data.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'revenue', component: DataPanelOneComponent },
  { path: 'interactive-data', component: InteractiveDataComponent }
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    // pass the routes array to RouterModule
    RouterModule.forRoot(routes)
  ],
  declarations: []
})

export class AppRoutingModule { }
