import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxMaskModule } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { NavComponent } from './shared/nav/nav.component';
import { SaidasComponent } from './components/saidas/saidas.component';
import { SaidaListaComponent } from './components/saidas/saida-lista/saida-lista.component';
import { SaidaDetalheComponent } from './components/saidas/saida-detalhe/saida-detalhe.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosListaComponent } from './components/usuarios/usuarios-lista/usuarios-lista.component';

import { ReservasComponent } from './components/reservas/reservas.component';
import { ReservaDetalheComponent } from './components/reservas/reserva-detalhe/reserva-detalhe.component';
import { ReservaListaComponent } from './components/reservas/reserva-lista/reserva-lista.component';


import { VeiculoService } from './services/veiculo.service';
import { SaidaService } from './services/saida.service';
import { UserService } from './services/user.service';
import { ReservaService } from './services/reserva.service';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { DateFormatPipe } from './helpers/DateFormat.pipe';
import { AuthInterceptor } from './auth/auth.interceptor';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
      VeiculosComponent,
      NavComponent,
      DashboardComponent,
      SaidasComponent,
      SaidaDetalheComponent,
      SaidaListaComponent,
      TituloComponent,
      DateTimeFormatPipe,
      DateFormatPipe,
      VeiculoDetalheComponent,
      VeiculoListaComponent,
      UserComponent,
      UsuariosComponent,
      UsuariosListaComponent,
      ProfileComponent,
      LoginComponent,
      RegistrationComponent,
      ReservasComponent,
      ReservaDetalheComponent,
      ReservaListaComponent
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule
  ],
  providers: [
    VeiculoService,
    SaidaService,
    ReservaService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
