import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { GanttComponent } from "./gantt.component";


@NgModule({
  declarations: [
    AppComponent,
    GanttComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
