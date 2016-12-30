import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { FormsModule }                          from '@angular/forms';
import { HttpModule }                           from '@angular/http';

import { AppRoutingModule }                     from './app.routing.module';
import { AppComponent }                         from './app.component';
import { ViewerComponent }                      from './viewer.component';

@NgModule({
  bootstrap:    [ AppComponent ],
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, ViewerComponent ],
  providers:    [ ]
})
export class AppModule { }
