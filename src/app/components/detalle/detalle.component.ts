import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { Actor, Trailer } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { DataLocalService } from '../../services/data-local.service';

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
  estrella = 'star-outline';

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  //  cuando no hay opciones
  sliderOptsVoid = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private modalController: ModalController,
    private movieService: MoviesService,
    private dataLocal: DataLocalService
  ) { }

  ngOnInit() {

    //  verificamos si la pelicula existe o no. para trabajar con la respuesta del lado del detalle.html
    //  es retornada una promesa.
    this.dataLocal.existePelicula( this.id )
        .then( existe => this.estrella = (existe) ? 'star' : 'star-outline' );

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

  async regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = (existe) ? 'star' : 'star-outline';
  }


}
