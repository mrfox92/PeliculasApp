import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public peliculas: Pelicula[] = [];
  public populares: Pelicula[] = [];

  constructor( private movieService: MoviesService ) {}

  ngOnInit() {
    this.movieService.getCartelera().subscribe( resp => {
      console.log( resp );
      this.peliculas = resp.results;
    });

    this.getPopulares();
  }


  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.movieService.getPopulares().subscribe( resp => {
      const arrTemp = [ ...this.populares, ...resp.results ];
      this.populares = arrTemp;
      console.log('populares', this.populares );
    });
  }

}
