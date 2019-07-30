

//    Peliculas

export interface ResponsePeliculasMDB {
    page: number;
    total_results: number;
    total_pages: number;
    results: Pelicula[];
}

export interface Pelicula {
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path?: string;
    adult: boolean;
    overview: string;
    release_date: string;
}

//    detalle pelicula

export interface PeliculaDetalle {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Productioncompany[];
    production_countries: Productioncountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Spokenlanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Spokenlanguage {
    iso_639_1: string;
    name: string;
}

export interface Productioncountry {
    iso_3166_1: string;
    name: string;
}

export interface Productioncompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface Genre {
    id: number;
    name: string;
}

//    Actores

export interface ResponseActores {
    id: number;
    cast: Actor[];
    crew: Crew[];
}

export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path?: string;
}

export interface Actor {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path?: string;
}
