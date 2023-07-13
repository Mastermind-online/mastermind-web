import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OnePlayerComponent } from './components/one-player/one-player.component';
import { TwoPlayersComponent } from './components/two-players/two-players.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'one-player', component: OnePlayerComponent },
  { path: 'two-players', component: TwoPlayersComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
