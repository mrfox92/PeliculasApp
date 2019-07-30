import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { AvatarPipe } from './avatar.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    AvatarPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    AvatarPipe
  ]
})
export class PipesModule { }
