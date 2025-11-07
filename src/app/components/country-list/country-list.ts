import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CountryModel } from '../../core/models/country.model';
 import { Router } from '@angular/router';
import { CountryCardComponent } from "../../shared/components/app-country-card/country-card";
import { SkeletonCardComponent } from '../../shared/styles/skeleton-card/skeleton-card';
import { Button } from "../../shared/components/button/button";
import { CountriesService } from '../../core/countries';
 
@Component({
  selector: 'app-country-list',
  imports: [CommonModule, AsyncPipe, CountryCardComponent, SkeletonCardComponent, Button],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  countries$: Observable<CountryModel[]>;
  loading$: Observable<boolean>;
  skeletonItems = Array(8).fill(0);

  constructor(
    private readonly countriesService: CountriesService, 
    private readonly router: Router
  ) { 
    this.countries$ = this.countriesService.countries$;
    this.loading$ = this.countriesService.loading$;
  }

  ngOnInit() {
    console.log('CountryListComponent initialized');
    this.countriesService.loadCountries();
  }

  public viewDetails(code: string) {
    this.router.navigate([`/${code}`]);
  }

  public deleteCountry(code: string) {
    this.countriesService.onDelete(code);
  }
}