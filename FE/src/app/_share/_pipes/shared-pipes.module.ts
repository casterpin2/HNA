import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelFilterPipe } from './label-filter.pipe';
import { CurrencyVndPipe } from './currency.pipe';



@NgModule({
  declarations: [
    LabelFilterPipe,
    CurrencyVndPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LabelFilterPipe,
    CurrencyVndPipe
  ]
})
export class SharedPipesModule { }
