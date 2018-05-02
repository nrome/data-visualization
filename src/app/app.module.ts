import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataPanelOneComponent } from './components/data-panel-one/data-panel-one.component';
import { PanelOneService } from './services/panel-one.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DataPanelOneComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PanelOneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
