import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  peliculas: Pelicula[] = [];
  loading = false;

  ideas: string[] = ['Avengers', 'Spiderman', 'Harry Potter', 'El señor de los anillos'];

  textoBuscar = '';

  constructor(
    private modalController: ModalController,
    private moviesService: MoviesService
  ) {}

  buscarPelicula( event ) {

    const textoBusqueda: string = event.detail.value;

    //  evaluamos si la busqueda viene vacia
    if ( textoBusqueda.length === 0 ) {

      this.peliculas = [];
      this.loading = false;
      return;
    }

    this.loading = true;
    //  llamar a nuestro servicio y realizar busqueda
    this.moviesService.buscarPelicula( textoBusqueda ).subscribe( resp => {
      this.peliculas = resp.results;
      this.loading = false;
    });
  }

  async verDetalle( id: string ) {

    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
