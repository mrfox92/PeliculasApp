import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { Genre, Actor } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;
  pelicula: PeliculaDetalle;
  actores: Actor[] = [];
  limitText = 150;
  toggleButton = false;

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(
    private modalController: ModalController,
    private movieService: MoviesService
  ) { }

  ngOnInit() {
    this.movieService.getDetallePelicula( this.id ).subscribe( resp => {
      this.pelicula = resp;
    });

    this.movieService.getActores( this.id ).subscribe( resp => {
      this.actores = resp.cast;
    });
  }

  toggle() {

    this.toggleButton = !this.toggleButton;

    if ( this.toggleButton ) {
      this.limitText = this.pelicula.overview.length;
    } else {
      this.limitText = 150;
    }
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    console.log('add favoritos');
  }


}
