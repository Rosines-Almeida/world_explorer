import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languagesPipe',
  standalone: true,
})
export class LanguagesPipe implements PipeTransform {
  transform(languages?: { [key: string]: string }): string {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  }
}
