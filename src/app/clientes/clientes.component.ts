import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page') || 0;

      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('init: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          })
        })
      )
        .subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se puede recuperar una vez borrado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Dale loco!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Borrado exitoso',
              `Cliente ${cliente.nombre} fué borrado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

}
