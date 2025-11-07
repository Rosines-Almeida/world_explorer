
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/country-list/country-list').then(
        (m) => m.CountryListComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./components/not-found/not-found').then(
        (m) => m.NotFoundComponent
      ),
  },
    {
        path: ':cca3',
        loadComponent: () =>
        import('./components/country-details/country-details').then(
            (m) => m.CountryDetailsComponent
        ),
    },
    

];
