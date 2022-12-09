import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyVnd'
})
export class CurrencyVndPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.toLocaleString() + ' VNĐ';
  }

}
