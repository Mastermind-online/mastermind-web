import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OnePlayerComponent } from './components/one-player/one-player.component';
import { TwoPlayersComponent } from './components/two-players/two-players.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { CreateCombinationComponent } from './components/create-combination/create-combination.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'one-player', component: OnePlayerComponent },
  { path: 'two-players', component: TwoPlayersComponent },
  { path: 'select-role', component: SelectRoleComponent },
  { path: 'create-combination', component: CreateCombinationComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
