import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
