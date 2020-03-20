import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CounterComponent } from './counter.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CounterComponent
  ],
  providers: [],
  exports: [CounterComponent]

})
export class CounterModule { }
