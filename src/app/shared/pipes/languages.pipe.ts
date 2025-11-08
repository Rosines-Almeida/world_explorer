import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languagesPipe',
  standalone: true,
})
export class LanguagesPipe implements PipeTransform {
  transform(languages?: { [key: string]: string }): string {
    if (!languages || Object.keys(languages).length === 0) {
      return 'N/A';
    }
    
    return Object.values(languages).join(', ');
  }
}
