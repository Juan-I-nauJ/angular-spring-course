import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {


@Input() paginador: any;

paginas: number[];
desde: number;
hasta: number;

constructor(){

}

private initPaginator():void{
  this.desde = Math.min(Math.max(1, this.paginador.number-4), this.paginador.totalPages-5); 
  this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number+4), 6 );
  if(this.paginador.totalPages > 5){
    this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_, i)=> i + this.desde);

  }else{
  this.paginas = new Array(this.paginador.totalPages).fill(0).map((_, i)=> ++i);
  }
}
ngOnInit(){
  this.initPaginator();
}

ngOnChanges(changes: SimpleChanges){
let paginadorActualizado = changes['paginador'];
if(paginadorActualizado.previousValue){
  this.initPaginator();

}

}

}
