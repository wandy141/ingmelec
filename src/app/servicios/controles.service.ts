import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { control } from '../modelos/control';
import { vehiculos } from '../modelos/vehiculos';
import { chofer } from '../modelos/chofer';
import { combustible } from '../modelos/combustible';

@Injectable({
  providedIn: 'root'
})
export class ControlesService {

  constructor( public http:HttpClient) { }
  servidor = 'http://127.0.0.1:8000/api/';

postControl(controltmp:control):Observable<boolean>{
return this.http.post<boolean>(this.servidor + 'control',{
  control:controltmp
})

}


vehiculoId(placa:string):Observable<vehiculos>{
return this.http.post<vehiculos>(this.servidor + 'vehiculoid', {
  placa:placa,
})
}

vehiculoFi(ficha:string):Observable<vehiculos>{
return this.http.post<vehiculos>(this.servidor + 'vehiculofi',{
ficha:ficha
})
}



login(id_usuario: string, contrasena: string) {
  return this.http.post<any>(this.servidor + 'login', {

    id_usuario: id_usuario,
    contrasena: contrasena,
  });
}


obtenerDatos()  {
  return localStorage.getItem('usuario');
}

todoChofer():Observable<Array<chofer>> {
  return this.http.get<Array<chofer>>(this.servidor + 'choferes',{});
}

//buscador del imput chofer
buscarResultados(termino:string): Observable<Array<chofer>> {
  return this.http.post<Array<chofer>>(this.servidor + 'peticion', {
    peticion:termino
  });

}



getCombustibles(){
  return this.http.get<Array<combustible>>(this.servidor + 'combustible');
}



}