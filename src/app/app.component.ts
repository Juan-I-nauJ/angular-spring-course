import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Selamat datang di Angular';
  curso:string = 'Kursus Spring dengan Angular';
  profesor:string = 'Andrés Guzmán';
}
