import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { control } from '../modelos/control';
import { Observable } from 'rxjs';
import html2canvas from 'html2canvas';

import * as pdfMake from 'pdfmake/build/pdfmake';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor( public http:HttpClient) { }
  servidor = 'http://127.0.0.1:8000/api/';


  getReporte(): Observable<Array<control>> {
    return this.http.get<Array<control>>(this.servidor + 'todoReporte', {});
  }




filtroReportes(idbrigada: number, orden:string,dias_anteriores:number):Observable<Array<control>> {
return this.http.post<Array<control>>(this.servidor + 'filtroBrigada',{

  idbrigada:idbrigada,
  orden:orden,
  dias_anteriores:dias_anteriores,
})

}

filtroReporteFechas(idbrigada: number,orden:string,fechaIni:string,fechaFin:string):Observable<Array<control>> {
  
  return this.http.post<Array<control>>(this.servidor + 'filtroFecha',{
  
    idbrigada:idbrigada,
    orden:orden,
    fechaIni:fechaIni,
    fechaFin:fechaFin
  })
  
  }

generatePdf(elementId: string): void {
  const element = document.getElementById(elementId);

  if (element) {
    const scaleFactor = 200.0;

    const pdfDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [],
      margin: [10, 1, 10, 20],
    };

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 2.0);

      const adjustedWidth = pdfDefinition.pageSize[1] * scaleFactor;
      const adjustedHeight = pdfDefinition.pageSize[0] * scaleFactor;

      pdfDefinition.content.push({ image: imgData, width: adjustedWidth, height: adjustedHeight });

      pdfMake.createPdf(pdfDefinition).download('reporte.pdf');
    });
  } else {
    console.error(`Element with ID '${elementId}' not found.`);
  }
}



}