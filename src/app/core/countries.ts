import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  private readonly countriesSubject = new BehaviorSubject<any[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  public readonly countries$ = this.countriesSubject.asObservable();
  public readonly loading$ = this.loadingSubject.asObservable();
  public readonly error$ = this.errorSubject.asObservable();

  private readonly countryDetailsCache = new Map<string, any>();
  private dataLoaded = false;

  constructor(private readonly http: HttpClient) { }

  public loadCountries(): void {
    if (this.dataLoaded && this.countriesSubject.value.length > 0) {
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const params = new HttpParams()
      .set('fields', 'name,flags,cca3,region,timezones,capital');

    this.http
      .get<any[]>(`${this.baseUrl}/all`, { params })
      .pipe(
        map((countries) =>
          countries.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          )
        ),
        tap(() => {
          this.dataLoaded = true;
          this.loadingSubject.next(false); // Para o loading ao sucesso
        }),
        catchError((error) => {

          this.loadingSubject.next(false);
          this.errorSubject.next('Erro ao carregar países. Tente novamente.');
          return of([]);
        })
      )
      .subscribe((data) => this.countriesSubject.next(data));
  }

  public getCountryByCode(code: string) {
     if (this.countryDetailsCache.has(code)) {
      return of(this.countryDetailsCache.get(code));
    }

    return this.http.get<any[]>(`${this.baseUrl}/alpha/${code}`).pipe(
      map(response => response[0]),
      tap(country => {
        if (!country) {
          throw new Error(`País ${code} não encontrado`);
        }
        this.countryDetailsCache.set(code, country);
        return country;
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

  public onDelete(cca3: string) {
    const updated = this.countriesSubject.value.filter(c => c.cca3 !== cca3);
    this.countriesSubject.next(updated);
  }

   public setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  public clearError(): void {
    this.errorSubject.next(null);
  }

   public get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}