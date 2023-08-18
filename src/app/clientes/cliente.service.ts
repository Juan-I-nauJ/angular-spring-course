import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import {Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private urlEndPoint:string = 'http://localhost:8080/api/clientes';
private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient, private router:Router) { }

  getClientes(page: number): Observable<any>{
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('getClientes tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log('nombre del cliente: ', cliente.nombre);
          
        });
        
      }),
      map((response:any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
            // let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyy', 'en-US');
          return cliente;
          
        });
        return response;
      }),
      tap(response => {
        console.log('getClientes tap 2');

        (response.content as Cliente[]).forEach(cliente => {
          console.log('nombre del cliente: ', cliente.nombre);
          
        });
        
      }),
      catchError(e => {
        console.log(e);
        // Swal.fire(e.error.mensaje, e.error.error, 'error' );
        return throwError(e);
  }
      )
    );
    // .pipe(
    //   map(response => response as Cliente[])
    //);
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);

        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error' );
        return throwError(e);
  }
      )
    );
}

getCliente(id: number): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/clientes']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar', e.error.mensaje, 'error' );
      return throwError(e);
    })
  );
}

update(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      if(e.status == 400){
        return throwError(e);

      }
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
}
    )
  );
}

delete(id: number):Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
}
    )
  );
}




}
