import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritosPorGenero: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private moviesService: MoviesService
  ) {}

  ngOnInit() { }

  //  Esta funcion se dispara cada vez que la pagina vaya a entrar( ciclo de vida del componente )
  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.peliculasPorGenero( this.generos, this.peliculas );
  }

  //  filtrar las peliculas por generos

  peliculasPorGenero( generos: Genre[], peliculas: PeliculaDetalle[] ) {

    // inicializamos nuestro array de favoritos como un arreglo vacio
    this.favoritosPorGenero = [];
    //  barremos los generos
    generos.forEach( genero => {
      //  agregamos un nuevo objeto a favoritos por genero mediante push
      this.favoritosPorGenero.push({
        genero: genero.name,
        //  grabamos las peliculas usando la funcion filter
        peliculas: peliculas.filter( pelicula => {
          //  guardamos solo las peliculas cuyo id genero sea igual a
          return pelicula.genres.find( genre => genre.id === genero.id);
        })
      });
    });

    //  console.log( this.favoritosPorGenero );
  }

  async emitirFavorito() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.peliculasPorGenero( this.generos, this.peliculas );
  }

}
