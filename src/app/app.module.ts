import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { GraphService } from './services/graph.service';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { AxesComponent } from './components/charts/axes/axes.component';
import { LegendComponent } from './components/charts/legend/legend.component';
import { LineChartCircleComponent } from './components/charts/line-chart-circle/line-chart-circle.component';
import { DataService } from './services/fetchdata.service';



@NgModule({
  exports: [
    MatTooltipModule,
    MatButtonModule
  ],
  //components :
  declarations: [
    AppComponent,
    ChartsComponent,
    BarChartComponent,
    LineChartComponent,
    AxesComponent,
    LegendComponent,
    LineChartCircleComponent
    
  ],
  //modules :
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatButtonModule
    

    
  ],
  //services :
  providers: [
    GraphService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
