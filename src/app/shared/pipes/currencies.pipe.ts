import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currenciesPipe',
  standalone: true,
})
export class CurrenciesPipe implements PipeTransform {
  transform(currencies?: { [key: string]: { name: string; symbol: string } }): string {
    return currencies
      ? Object.values(currencies)
          .map(c => `${c.name} (${c.symbol})`)
          .join(', ')
      : 'N/A';
  }
}
