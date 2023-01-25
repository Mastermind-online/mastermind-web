import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OnePlayerComponent } from './components/one-player/one-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatList, MatListItem } from '@angular/material/list';
import { AngularMaterialModule } from 'src/angular-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AttemptComponent } from './components/attempt/attempt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnePlayerComponent,
    AttemptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
