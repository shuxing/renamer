import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { FormsModule }                          from '@angular/forms';
import { HttpModule }                           from '@angular/http';
import { APP_BASE_HREF }                        from '@angular/common';

import { AppRoutingModule }         from './app.routing.module';
import { AppComponent }                         from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent ],
  providers:    [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
