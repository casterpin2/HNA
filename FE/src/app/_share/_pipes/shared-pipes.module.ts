import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelFilterPipe } from './label-filter.pipe';



@NgModule({
  declarations: [
    LabelFilterPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LabelFilterPipe,
  ]
})
export class SharedPipesModule { }
