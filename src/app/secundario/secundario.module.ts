import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecundarioComponent } from './secundario.component';
import { ControlComponent } from '../componentes/control/control.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReportesComponent } from '../componentes/reportes/reportes.component';
import { DashComponent } from '../componentes/dash/dash.component';



@NgModule({
  declarations: [
    SecundarioComponent,
    ControlComponent,
    ReportesComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'side', component: SecundarioComponent ,
      children: [
        { path: 'control', component: ControlComponent },
        { path: 'reporte', component: ReportesComponent },
        { path: 'dash', component: DashComponent },

      ],
    },

    ]),
  ],
})
export class SecundarioModule { }
