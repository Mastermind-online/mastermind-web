import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OnePlayerComponent } from './components/one-player/one-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/angular-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AttemptComponent } from './components/attempt/attempt.component';
import { TwoPlayersComponent } from './components/two-players/two-players.component';
import { RulesModalComponent } from './components/rules-modal/rules-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { CodeMasterComponent } from './components/code-master/code-master.component';
import { CodeBreakerComponent } from './components/code-breaker/code-breaker.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { CreateCombinationComponent } from './components/create-combination/create-combination.component';
import { MasterAttemptComponent } from './components/master-attempt/master-attempt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnePlayerComponent,
    AttemptComponent,
    TwoPlayersComponent,
    RulesModalComponent,
    CodeMasterComponent,
    CodeBreakerComponent,
    SelectRoleComponent,
    CreateCombinationComponent,
    MasterAttemptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    DragDropModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
