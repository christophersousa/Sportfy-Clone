import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerRouter } from './player.routes';
import { PlayerComponent } from './player.component';



@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRouter)
  ]
})
export class PlayerModule { }
