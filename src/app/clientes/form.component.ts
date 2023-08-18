import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
  import Swal from 'sweetalert2';
  import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
  

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
public cliente: Cliente = new Cliente();
public titulo:string = "Crear Cliente";
public errores:string[];

constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute){

}

ngOnInit(){
  this.cargarCliente();
}

public cargarCliente():void{
this.activatedRoute.params.subscribe(params => {
  let id = params['id'];
  if(id){
    this.clienteService.getCliente(id).subscribe(
      cliente => this.cliente = cliente
    );
  }
})
}

public create():void{
this.clienteService.create(this.cliente).subscribe({
  next: cliente => {this.router.navigate(['/clientes']); 
  Swal.fire('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con éxito`, 'success');},
  error: (err)=>{
    this.errores = err.error.errors as string[];
    console.error('Código: '+err.status, err.error.errors);
  }
});
}

public update():void{
  this.clienteService.update(this.cliente).subscribe({
    next: cliente => {this.router.navigate(['/clientes']);
    Swal.fire('Cliente Modificado', `Cliente ${this.cliente.nombre} editado con éxito`, 'success');
    },
    error: err=>{

      this.errores = err.error.errors as string[];
      console.error('Código: '+err.status, err.error.errors);
    }
});
}



}
