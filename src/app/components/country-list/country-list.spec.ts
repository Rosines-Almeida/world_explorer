import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountryListComponent } from './country-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesService } from '../../core/countries';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CountryModel } from '../../core/models/country.model';
import { By } from '@angular/platform-browser';

 
describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockCountriesService: jest.Mocked<CountriesService>

   const mockCountries: CountryModel[] = [
    { 
      cca3: 'BRA', 
      name: { common: 'Brazil' }, 
      flags: { png: 'flag1.png', svg: '', alt: '' }, 
      region: 'Americas', 
      capital: ['Brasília'], 
      timezones: [] 
    },
    { 
      cca3: 'ARG', 
      name: { common: 'Argentina' }, 
      flags: { png: 'flag2.png', svg: '', alt: '' }, 
      region: 'Americas', 
      capital: ['Buenos Aires'], 
      timezones: [] 
    }
  ];


beforeEach(async () => { 
    const countriesSubject = new BehaviorSubject<CountryModel[]>(mockCountries);
    const loadingSubject = new BehaviorSubject<boolean>(false);

    mockCountriesService = {
      countries$: countriesSubject.asObservable(),
      loading$: loadingSubject.asObservable(),
      loadCountries: jest.fn(),
      onDelete: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [CountryListComponent],
      providers: [
         { provide: CountriesService, useValue: mockCountriesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialização', () => {
    it('deve carregar países no ngOnInit', () => {
      component.ngOnInit();
      expect(mockCountriesService.loadCountries).toHaveBeenCalled();
    });

    it('deve inicializar observables do service', () => {
      expect(component.countries$).toBe(mockCountriesService.countries$);
      expect(component.loading$).toBe(mockCountriesService.loading$);
    });

    
  });

   

  describe('Gerenciamento de Países', () => {
    it('deve deletar país chamando service', () => {
      component.deleteCountry('BRA');
      expect(mockCountriesService.onDelete).toHaveBeenCalledWith('BRA');
    });
  });

  describe('Renderização', () => {
    it('deve renderizar países quando disponíveis', (done) => {
      component.countries$.subscribe(countries => {
        fixture.detectChanges();
        const countryCards = fixture.nativeElement.querySelectorAll('app-country-card');
        expect(countryCards.length).toBe(2);
        done();
      });
    });

    it('deve passar dados corretos para country cards', (done) => {
      component.countries$.subscribe(() => {
        fixture.detectChanges();
        const countryCards = fixture.nativeElement.querySelectorAll('app-country-card');
        expect(countryCards[0].getAttribute('ng-reflect-country')).toBeDefined();
        done();
      });
    });
  });

  describe('Interação com User', () => {
    it('deve chamar viewDetails no evento do card', () => {
      const viewDetailsSpy = jest.spyOn(component, 'viewDetails');
      fixture.detectChanges();
      
      const countryCardDebugElement = fixture.debugElement.query(By.css('app-country-card'));
      const countryCardComponent = countryCardDebugElement.componentInstance;
      countryCardComponent.viewDetails.emit('BRA');
      
      expect(viewDetailsSpy).toHaveBeenCalledWith('BRA');
    });

    it('deve chamar deleteCountry no evento de delete', () => {
      const deleteSpy = jest.spyOn(component, 'deleteCountry');
      fixture.detectChanges();
      
      const countryCardDebugElement = fixture.debugElement.query(By.css('app-country-card'));
      const countryCardComponent = countryCardDebugElement.componentInstance;
      countryCardComponent.delete.emit('BRA');
      
      expect(deleteSpy).toHaveBeenCalledWith('BRA');
    });
  });
});