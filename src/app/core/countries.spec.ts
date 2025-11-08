import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountriesService } from './countries';

describe('CountriesService', () => {
  let service: CountriesService;
    let httpMock: HttpTestingController;

  beforeEach(() => {    
   TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService]
    });
    
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

   afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('deve carregar países ordenados alfabeticamente', () => {
        const mockCountries = [
          { name: { common: 'Brazil' }, cca3: 'BRA' },
          { name: { common: 'Argentina' }, cca3: 'ARG' }
        ];

        service.loadCountries();
        
        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        expect(req.request.method).toBe('GET');
        
        req.flush(mockCountries);
        
        service.countries$.subscribe(countries => {
          expect(countries[0].name.common).toBe('Argentina'); // Primeiro alfabeticamente
          expect(countries[1].name.common).toBe('Brazil');    // Segundo alfabeticamente
        });
      })

       it('não deve fazer nova requisição se dados já foram carregados', () => {
        service.loadCountries();
        const firstReq = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        firstReq.flush([{ name: { common: 'Test' }, cca3: 'TST' }]);

        service.loadCountries();

        httpMock.expectNone('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
      });

      it('deve atualizar estado de loading durante requisição', () => {
        service.loadCountries();

        expect(service.isLoading).toBe(true);

        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        req.flush([]);

        expect(service.isLoading).toBe(false);
      });

          it('deve emitir erro quando requisição falhar', () => {
        service.loadCountries();

        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        req.error(new ErrorEvent('Network error'));

        service.error$.subscribe(error => {
          expect(error).toBe('Erro ao carregar países. Tente novamente.');
        });
        expect(service.isLoading).toBe(false);
      });
    it('deve retornar país do cache quando disponível', (done) => {
        const mockCountry = { name: { common: 'Brazil' }, cca3: 'BRA' };
        
        service.getCountryByCode('BRA').subscribe(firstResult => {
          expect(firstResult).toEqual(mockCountry);
          
          service.getCountryByCode('BRA').subscribe(secondResult => {
            expect(secondResult).toEqual(mockCountry);
            done();
          });
        });

        const req = httpMock.expectOne('https://restcountries.com/v3.1/alpha/BRA');
        req.flush([mockCountry]);
      });

       xit('deve retornar undefined quando país não for encontrado', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        let result: any;
        
        service.getCountryByCode('INVALID').subscribe(response => {
          result = response;
        });

        const req = httpMock.expectOne('https://restcountries.com/v3.1/alpha/INVALID');
        req.error(new ErrorEvent('Not found'));

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
      }); 

       it('deve remover país da lista', () => {
        const mockCountries = [
          { name: { common: 'Brazil' }, cca3: 'BRA' },
          { name: { common: 'Argentina' }, cca3: 'ARG' }
        ];
        
        service.loadCountries();
        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        req.flush(mockCountries);

        service.onDelete('BRA');

        service.countries$.subscribe(countries => {
          expect(countries.length).toBe(1);
          expect(countries[0].cca3).toBe('ARG');
        });
      });

       describe('Comportamento dos Observables', () => {
    it('deve fornecer observables para estado da aplicação', () => {
      expect(service.countries$).toBeDefined();
      expect(service.loading$).toBeDefined();
      expect(service.error$).toBeDefined();
    });

    it('deve permitir controle manual de loading e erro', () => {
      service.setLoading(true);
      expect(service.isLoading).toBe(true);

      service.clearError();
      service.error$.subscribe(error => {
        expect(error).toBeNull();
      });
    });
  });
    });  
    
