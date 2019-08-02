import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { AvatarPipe } from './avatar.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    AvatarPipe,
    FiltroImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    AvatarPipe,
    FiltroImagenPipe
  ]
})
export class PipesModule { }
