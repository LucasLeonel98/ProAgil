import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  _filtroLista: string;
  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosFiltrados: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarimagem = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string) {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  alternarimagem() {
    this.mostrarimagem = !this.mostrarimagem;
  }

  getEventos() {
    this.eventos = this.http.get('http://localhost:5000/api/WeatherForecast/').subscribe(response => {
      this.eventos = response;
      console.log(response);
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    }
    );
  }

}
