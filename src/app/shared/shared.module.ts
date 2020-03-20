import { TimerPipe } from './../pipes/timer.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [TimerPipe],
  imports: [
    CommonModule
  ],
  exports: [
    TimerPipe
  ]
})
export class SharedModule { }
