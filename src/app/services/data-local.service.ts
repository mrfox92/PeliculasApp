import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.cargarFavoritos();
  }


  async presentToast( mensaje: string ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });

    toast.present();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {

    let existe = false;
    let mensaje = '';

    //  busco en el array si algun elemento coincide con la pelicula que viene como argumento

    //  caso 1, si existe, entonces esta duplicado y no deseamos grabar.

    //  caso 2, no existe, entonces grabamos el elemento en nuestro storage

    //  solo evaluar cuando hay datos en el storage
    this.peliculas.find( peli => {
      if ( peli.id === pelicula.id ) {
        existe = true;
        return true;
      }
    });

    //  evaluamos

    if ( existe ) {
      //  borramos del array la pelicula
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';

    } else {
      //  agregamos la pelicula al array
      this.peliculas.unshift( pelicula );
      mensaje = 'Agregada a favoritos';

    }

    //  mostrar mensaje
    this.presentToast( mensaje );
    //  para ambos casos debemos grabar en el storage
    this.storage.set('peliculas', this.peliculas);

    //  retornamos el valor booleano existe para cambiar el icono de favoritos
    return !existe;
  }


  async cargarFavoritos() {

    //  si el elemento peliculas no existe en el storage entonces retornara un null
    const peliculas = await this.storage.get('peliculas');

    //  decimos si es retornado un null, entonces que inicialice el array con un arreglo vacio
    this.peliculas = peliculas || [];
    //  retornamos las peliculas
    return this.peliculas;
  }

  //  funcion asincrona para comprobar si la pelicula existe en el storage marcada como favorito.
  //  se recibe el id de la pelicula como argumento.
  async existePelicula( id ) {
    //  le decimos que espere a que se carguen los favoritos para evitar mandar informacion erronea al usuario
    await this.cargarFavoritos();
    //  retorna el objeto de la pelicula si existe, caso contrario retorna undefined
    const existe = this.peliculas.find( peli => peli.id === id );
    //  retornamos true si existe, caso contrario un false.
    return (existe) ? true : false;
  }
}
