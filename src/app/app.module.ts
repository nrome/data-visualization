import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataPanelOneComponent } from './components/data-panel-one/data-panel-one.component';
import { PanelOneService } from './services/panel-one.service';
import { BuildingsService } from './services/buildings.service';
import { AppRoutingModule } from './/app-routing.module';
import { InteractiveDataComponent } from './components/interactive-data/interactive-data.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DataPanelOneComponent,
    InteractiveDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // providers take in services
  providers: [PanelOneService, BuildingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
