import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { CountryDetailModel } from '../../core/models/country.model';
import { InfoCardComponent } from "../../shared/components/info-card/info-card"; 
import { Location } from "../location/location";
import { CurrenciesPipe } from '../../shared/pipes/currencies.pipe';
import { LanguagesPipe } from '../../shared/pipes/languages.pipe';
import { Button } from '../../shared/components/button/button';
import { CountriesService } from '../../core/countries';
 
@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [
    AsyncPipe,
    InfoCardComponent,
    CurrenciesPipe,
    LanguagesPipe,
    CommonModule,
    Button,
    Location
],
  templateUrl: './country-details.html',
  styleUrl: './country-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent {
  public country$!: Observable<CountryDetailModel | undefined>;
  public isLoading = true;
   
   constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly countryServices: CountriesService
  ) {}

  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      map(params => params.get('cca3')),
      filter((code): code is string => !!code),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
       }),
      switchMap(code => {
        return this.countryServices.getCountryByCode(code).pipe(
          map(country => country as CountryDetailModel),
          tap(country => {
            this.isLoading = false;
            if (!country) {
              this.goToNotFound();
            }
          }),
          catchError(() => {
            this.isLoading = false;
             this.goToNotFound();
            return of(undefined);
          })
        );
      })
    );
  }

  public back(): void {
    this.router.navigate(['/']);
  }

  private goToNotFound(): void {
     this.router.navigate(['/not-found']);
  }


}