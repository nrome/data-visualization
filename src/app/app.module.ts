import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataPanelOneComponent } from './components/data-panel-one/data-panel-one.component';
import { PanelOneService } from './services/panel-one.service';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DataPanelOneComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PanelOneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
