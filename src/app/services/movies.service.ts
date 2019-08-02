import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponsePeliculasMDB, PeliculaDetalle, ResponseActores, ResponseTrailer, Genre } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {

    query = `${ URL }${ query }&api_key=${ apiKey }&language=es&include_image_language=es`;
    return this.http.get<T>( query );
  }

  getPopulares() {
    this.popularesPage ++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<ResponsePeliculasMDB>( query );
  }

  getCartelera() {

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }


    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin    = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;
    // tslint:disable-next-line: max-line-length
    return this.ejecutarQuery<ResponsePeliculasMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getDetallePelicula( id: string ) {
    const query = `/movie/${ id }?a=1`;
    return this.ejecutarQuery<PeliculaDetalle>( query );
  }

  getActores( id: string ) {
    const query = `/movie/${ id }/credits?a=1`;
    return this.ejecutarQuery<ResponseActores>( query );
  }

  buscarPelicula( texto: string ) {
    const query = `/search/movie?query=${ texto }`;
    return this.ejecutarQuery<ResponsePeliculasMDB>( query );
  }

  //  declaramos el tipo de datos que retornara la funcion
  cargarGeneros(): Promise<Genre[]> {
    //  retornamos la promesa con la data generos
    return new Promise( resolve => {

      this.ejecutarQuery<Genre>(`/genre/movie/list?a=1`)
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map( resp => resp['genres'])
      )
      .subscribe( resp => {
        // tslint:disable-next-line: no-string-literal
        this.generos = resp;
        console.log( this.generos );
        //  resolvemos la promesa y enviamos los generos
        resolve( this.generos );
      });

    });
  }
}
