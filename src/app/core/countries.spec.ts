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
        // Arrange
        const mockCountries = [
          { name: { common: 'Brazil' }, cca3: 'BRA' },
          { name: { common: 'Argentina' }, cca3: 'ARG' }
        ];

        // Act
        service.loadCountries();
        
        // Assert - Verifica se a requisição foi feita
        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        expect(req.request.method).toBe('GET');
        
        // Simula resposta da API
        req.flush(mockCountries);
        
        // Verifica se os países estão ordenados
        service.countries$.subscribe(countries => {
          expect(countries[0].name.common).toBe('Argentina'); // Primeiro alfabeticamente
          expect(countries[1].name.common).toBe('Brazil');    // Segundo alfabeticamente
        });
      })

       it('não deve fazer nova requisição se dados já foram carregados', () => {
        // Arrange - Primeira chamada
        service.loadCountries();
        const firstReq = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        firstReq.flush([{ name: { common: 'Test' }, cca3: 'TST' }]);

        // Act - Segunda chamada (deve usar cache)
        service.loadCountries();

        // Assert - Não deve haver segunda requisição
        httpMock.expectNone('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
      });

      it('deve atualizar estado de loading durante requisição', () => {
        // Arrange & Act
        service.loadCountries();

        // Assert - Deve iniciar loading
        expect(service.isLoading).toBe(true);

        // Simula resposta
        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        req.flush([]);

        // Deve parar loading após resposta
        expect(service.isLoading).toBe(false);
      });

          it('deve emitir erro quando requisição falhar', () => {
        // Act
        service.loadCountries();

        // Simula erro
        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        req.error(new ErrorEvent('Network error'));

        // Assert
        service.error$.subscribe(error => {
          expect(error).toBe('Erro ao carregar países. Tente novamente.');
        });
        expect(service.isLoading).toBe(false);
      });
    it('deve retornar país do cache quando disponível', (done) => {
        // Arrange - Primeiro busca da API
        const mockCountry = { name: { common: 'Brazil' }, cca3: 'BRA' };
        
        service.getCountryByCode('BRA').subscribe(firstResult => {
          // Primeira chamada deve vir da API
          expect(firstResult).toEqual(mockCountry);
          
          // Segunda chamada - deve vir do cache
          service.getCountryByCode('BRA').subscribe(secondResult => {
            expect(secondResult).toEqual(mockCountry);
            done();
          });
        });

        const req = httpMock.expectOne('https://restcountries.com/v3.1/alpha/BRA');
        req.flush([mockCountry]);
      });

       xit('deve retornar undefined quando país não for encontrado', () => {
        // Arrange - Mock console.error para evitar logs durante o teste
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        let result: any;
        
        // Act & Assert
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
        // Arrange - Carrega alguns países
        const mockCountries = [
          { name: { common: 'Brazil' }, cca3: 'BRA' },
          { name: { common: 'Argentina' }, cca3: 'ARG' }
        ];
        
        service.loadCountries();
        const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,timezones,capital');
        req.flush(mockCountries);

        // Act
        service.onDelete('BRA');

        // Assert
        service.countries$.subscribe(countries => {
          expect(countries.length).toBe(1);
          expect(countries[0].cca3).toBe('ARG');
        });
      });

       describe('Comportamento dos Observables', () => {
    it('deve fornecer observables para estado da aplicação', () => {
      // Testa se os observables públicos estão disponíveis
      expect(service.countries$).toBeDefined();
      expect(service.loading$).toBeDefined();
      expect(service.error$).toBeDefined();
    });

    it('deve permitir controle manual de loading e erro', () => {
      // Testa métodos auxiliares
      service.setLoading(true);
      expect(service.isLoading).toBe(true);

      service.clearError();
      service.error$.subscribe(error => {
        expect(error).toBeNull();
      });
    });
  });
    });  
    