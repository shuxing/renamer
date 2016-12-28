import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { FormsModule }                          from '@angular/forms';
import { HttpModule }                           from '@angular/http';
import { APP_BASE_HREF }                        from '@angular/common';

import { routing, appRoutingProviders }         from './app.routing';
import { AppComponent }                         from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent ],
  providers:    [ appRoutingProviders ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
