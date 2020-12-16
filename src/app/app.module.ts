import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LineGraphComponent,
    FormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
