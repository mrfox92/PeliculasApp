import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponsePeliculasMDB, PeliculaDetalle, ResponseActores } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

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
}
