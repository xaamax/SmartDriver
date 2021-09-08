import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaidasComponent } from './components/saidas/saidas.component';
import { SaidaDetalheComponent } from './components/saidas/saida-detalhe/saida-detalhe.component';
import { SaidaListaComponent } from './components/saidas/saida-lista/saida-lista.component';

import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';

import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosListaComponent } from './components/usuarios/usuarios-lista/usuarios-lista.component';

import { ReservasComponent } from './components/reservas/reservas.component';
import { ReservaListaComponent } from './components/reservas/reserva-lista/reserva-lista.component';
import { ReservaDetalheComponent } from './components/reservas/reserva-detalhe/reserva-detalhe.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'profile/:profile', component: ProfileComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'veiculos', redirectTo: 'veiculos/lista' },
  { path: 'usuarios', redirectTo: 'usuarios/lista' },
  { path: 'saidas', redirectTo: 'saidas/lista' },
  { path: 'reservas', redirectTo: 'reservas/lista' },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'lista', component: UsuariosListaComponent },
    ],
  },
  {
    path: 'veiculos',
    component: VeiculosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'veiculo', component: VeiculoDetalheComponent },
      { path: 'veiculo/:veiculo', component: VeiculoDetalheComponent },
      { path: 'lista', component: VeiculoListaComponent },
    ],
  },
  {
    path: 'saidas',
    component: SaidasComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'detalhe', component: SaidaDetalheComponent },
      { path: 'saida/veiculo/:veiculo', component: SaidaDetalheComponent },
      { path: 'veiculo/:veiculo/saida/:saida', component: SaidaDetalheComponent },
      { path: 'lista', component: SaidaListaComponent },
    ],
  },
  {
    path: 'reservas',
    component: ReservasComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'lista', component: ReservaListaComponent },
    ],
  },
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'user/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
