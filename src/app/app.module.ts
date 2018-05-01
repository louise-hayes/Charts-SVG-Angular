import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { GraphService } from './services/graph.service';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { AxesComponent } from './components/charts/axes/axes.component';
import { LegendComponent } from './components/charts/legend/legend.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    TooltipComponent,
    BarChartComponent,
    LineChartComponent,
    AxesComponent,
    LegendComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
