import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { control } from 'src/app/modelos/control';
import { ReporteService } from 'src/app/servicios/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  ngOnInit() {
    this.clickedFiltro();
    this.inicializarDropdown();
    this.actualizarFecha();
  }

  constructor(private servicio: ReporteService, private http: HttpClient) {}

  fechaIni: string = '';
  fechaFin: string = '';
  fecha: string = '';
  
  listBrigada: boolean = false;
  listOrden: boolean = false;

  msgFechaVacia: boolean = false;
  msgFechaMayor: boolean = false;


  brigada: number = 0;
  selectedOrden: string = 'desc';
  selectedTiempo: number = 7;
  nombreTiempo: string = '';

  todoReporte: Array<control> = [];
  reportesFiltrados: Array<control> = [];

  totalGalones: number = 0;
  totalKilometrajeIni: number = 0;
  totalKilometrajeAct: number = 0;
  precio_galon: number = 0;


  actualizarFecha() {
    this.http.get<any>('https://worldtimeapi.org/api/ip').subscribe(
      (response) => {
        let fechaUtc = new Date(response.utc_datetime);
        fechaUtc.setHours(fechaUtc.getHours() - 4);

        const dia = fechaUtc.getDate().toString().padStart(2, '0');
        const mes = (fechaUtc.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaUtc.getFullYear();

        this.fecha = `${dia}/${mes}/${anio}`;
      },
      (error) => {
        console.error('Error al obtener la fecha externa:', error);
      }
    );
  }

  private calcularTotales() {
    this.totalGalones = this.todoReporte.reduce(
      (total, item) => total + (item.combustible || 0),
      0
    );
    this.totalKilometrajeIni = this.todoReporte.reduce(
      (total, item) => total + (item.kilometraje || 0),
      0
    );
    this.totalKilometrajeAct = this.todoReporte.reduce(
      (total, item) => total + (item.kilometraje_act || 0),
      0
    );
    this.precio_galon = this.todoReporte.reduce(
      (total, item) => total + (item.precio_galon || 0),
      0
    );
  }

  inicializarDropdown() {
    // boton de brigada
    const dropdownToggleButton = document.getElementById(
      'dropdownHelperRadioButton'
    );
    const dropdownContainer = document.getElementById('dropdownHelperRadio');

    if (dropdownToggleButton && dropdownContainer) {
      dropdownToggleButton.addEventListener('click', () => {
        dropdownContainer.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
          !dropdownToggleButton.contains(target) &&
          !dropdownContainer.contains(target)
        ) {
          dropdownContainer.classList.add('hidden');
        }
      });
    }

    // boton de orden
    const ordenBoton = document.getElementById('ordenButton');
    const ordenlist = document.getElementById('orden');

    if (ordenBoton && ordenlist) {
      ordenBoton.addEventListener('click', () => {
        ordenlist.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!ordenBoton.contains(target) && !ordenlist.contains(target)) {
          ordenlist.classList.add('hidden');
        }
      });
    }

    // boton de tiempo

    const dropdownRadioButton = document.getElementById('dropdownRadioButton');
    const dropdownRadio = document.getElementById('dropdownRadio');

    if (dropdownRadioButton && dropdownRadio) {
      dropdownRadioButton.addEventListener('click', () => {
        dropdownRadio.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
          !dropdownRadioButton.contains(target) &&
          !dropdownRadio.contains(target)
        ) {
          dropdownRadio.classList.add('hidden');
        }
      });
    }

    const dropdownFechaButton = document.getElementById('dropdownFecha');
    const dropdownFecha = document.getElementById('dropdown-example');

    if (dropdownFechaButton && dropdownFecha) {
      dropdownFechaButton.addEventListener('click', () => {
        dropdownFecha.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
          !dropdownFechaButton.contains(target) &&
          !dropdownFecha.contains(target)
        ) {
          dropdownFecha.classList.add('hidden');
        }
      });
    }
  }

  reportes() {
    this.servicio.getReporte().subscribe((listado) => {
      this.todoReporte = listado;
    });
  }

  selectedBrigada: number = 1;
  nombreBrigada: string = '';
  options = [
    { id: 'option1', value: 1, label: 'Distrito Nacional' },
    { id: 'option2', value: 2, label: 'Villa Altagracia' },
    { id: 'option3', value: 3, label: 'Azua' },
    { id: 'option4', value: 4, label: 'Puerto plata' },
    { id: 'option5', value: 5, label: 'San Francisco de Macoris' },
    { id: 'option6', value: 6, label: 'Redes santiago' },
    { id: 'option7', value: 7, label: 'Redes mao' },
  ];

  ordens = [
    { id: 'option8', value: 'asc', label: 'Menor consumo' },
    { id: 'option9', value: 'desc', label: 'Mayor consumo' },
  ];

  tiempos = [
    { id: 'option14', value: 1, descripcion: 'diario' },
    { id: 'option11', value: 7, descripcion: 'Semanal' },
    { id: 'option12', value: 15, descripcion: 'Quicenal' },
    { id: 'option13', value: 30, descripcion: 'Mensual' },
  ];

  clickedFiltro() {
    switch (this.selectedBrigada) {
      case 1:
        this.nombreBrigada = 'Distrito Nacional';
        break;
      case 2:
        this.nombreBrigada = 'Villa Altagracia';
        break;
      case 3:
        this.nombreBrigada = 'Azua';

        break;
      case 4:
        this.nombreBrigada = 'Puerto Plata';

        break;
      case 5:
        this.nombreBrigada = 'San Francisco';

        break;
      case 6:
        this.nombreBrigada = 'Redes santiago';

        break;
      case 7:
        this.nombreBrigada = 'Redes mao';

        break;
    }

    switch (this.selectedTiempo) {
      case 1:
        this.nombreTiempo = 'Diario';
        break;
      case 7:
        this.nombreTiempo = 'Semanal';
        break;
      case 15:
        this.nombreTiempo = 'Quicenal';

        break;
      case 30:
        this.nombreTiempo = 'Mensual';

        break;
    }

    this.servicio
      .filtroReportes(
        this.selectedBrigada,
        this.selectedOrden,
        this.selectedTiempo
      )
      .subscribe((retorno: any) => {
        this.todoReporte = retorno;
        this.calcularTotales();
      });
  }

  filtrosFechas() {
    if (!this.fechaIni || !this.fechaFin) {
      this.msgFechaVacia = true;
      setTimeout(() => {
      this.msgFechaVacia = false;
        
      }, 3000);
      return;
    }

    if (this.fechaIni>this.fechaFin) {
      this.msgFechaMayor = true;
      setTimeout(() => {
      this.msgFechaMayor = false;
        
      }, 3000);
      return;
    }

   

    this.servicio
      .filtroReporteFechas(
        this.selectedBrigada,
        this.selectedOrden,
        this.fechaIni,
        this.fechaFin
      )
      .subscribe({
        next: (retorno: any) => {
          this.todoReporte = retorno;
          console.log(retorno);
          this.calcularTotales();
        },
        error: (error) => {
          console.error('Error en la llamada al servicio:', error);
        },
        complete: () => {},
      });
  }

  generatePdf(): void {
    this.servicio.generatePdf('report');
  }





}
