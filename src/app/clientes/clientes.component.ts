import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService){

  }

  ngOnInit(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

delete(cliente: Cliente):void{
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
