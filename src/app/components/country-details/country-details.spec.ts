import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CountriesService } from '../../core/countries';
import { CountryDetailModel } from '../../core/models/country.model';
import { CountryDetailsComponent } from './country-details';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;
  let mockRouter: jest.Mocked<Router>;
  let mockCountriesService: jest.Mocked<CountriesService>;

  const mockCountry: CountryDetailModel = {
    cca3: 'BRA',
    name: { common: 'Brazil' },
    flags: { png: 'flag.png', svg: 'flag.svg', alt: 'Brazil flag' },
    region: 'Americas',
    subregion: 'South America',
    capital: ['Brasília'],
    population: 212559417,
    timezones: ['UTC-03:00'],
    currencies: { BRL: { name: 'Brazilian Real', symbol: 'R$' } },
    languages: { por: 'Portuguese' },
    borders: ['ARG', 'COL', 'URY']
  };

  beforeEach(async () => {
    // Mock dos serviços
    mockActivatedRoute = {
      paramMap: of({
        get: jest.fn().mockReturnValue('BRA'),
        has: jest.fn(),
        getAll: jest.fn(),
        keys: jest.fn()
      })
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockCountriesService = {
      getCountryByCode: jest.fn().mockReturnValue(of(mockCountry))
    } as any;

    await TestBed.configureTestingModule({
      imports: [CountryDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: CountriesService, useValue: mockCountriesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialização e Carregamento', () => {
    
    it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('deve carregar país baseado no parâmetro da rota', (done) => {
      // Act
      component.ngOnInit();

      // Assert
      component.country$.subscribe(country => {
        expect(country).toEqual(mockCountry);
        expect(mockCountriesService.getCountryByCode).toHaveBeenCalledWith('BRA');
        done();
      });
    });

    it('deve usar distinctUntilChanged para evitar chamadas desnecessárias', (done) => {
      // Arrange
      const getCountrySpy = mockCountriesService.getCountryByCode;
      
      // Act
      component.ngOnInit();

      // Assert
      component.country$.subscribe(() => {
        expect(getCountrySpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('Tratamento de Erros', () => {
    
    it('deve navegar para not-found quando país não existe', (done) => {
      // Arrange
      mockCountriesService.getCountryByCode.mockReturnValue(of(undefined));

      // Act
      component.ngOnInit();

      // Assert
      component.country$.subscribe(() => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-found']);
        expect(component.isLoading).toBe(false);
        done();
      });
    });

    it('deve navegar para not-found em caso de erro na API', (done) => {
      // Arrange
      mockCountriesService.getCountryByCode.mockReturnValue(throwError(() => new Error('API Error')));

      // Act
      component.ngOnInit();

      // Assert
      component.country$.subscribe(() => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-found']);
        expect(component.isLoading).toBe(false);
        done();
      });
    });
  });

  describe('Navegação', () => {
    
    it('deve navegar para home ao voltar', () => {
      // Act
      component.back();

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('deve navegar para not-found quando país não encontrado', () => {
      // Act
      component['goToNotFound'](); // Método privado

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-found']);
    });
  });

  describe('Comportamento do Template', () => { 
    it('deve mostrar conteúdo após carregamento', async () => {
      // Arrange & Act
      component.ngOnInit();
      
      // Aguarda o observable emitir
      await new Promise(resolve => {
        component.country$.subscribe(() => resolve(true));
      });
      
      fixture.detectChanges();
      
      // Assert
      const mainElement = fixture.nativeElement.querySelector('main.country-details');
      const headerElement = fixture.nativeElement.querySelector('.country-header');
      const infoGridElement = fixture.nativeElement.querySelector('.info-grid');
      
      expect(mainElement).toBeTruthy();
      expect(headerElement).toBeTruthy();
      expect(infoGridElement).toBeTruthy();
    });
  });

  describe('Validação de Parâmetros', () => {
    
    it('não deve carregar país quando parâmetro cca3 é nulo', () => {
      // Arrange
      (mockActivatedRoute as any).paramMap = of({
        get: jest.fn().mockReturnValue(null),
        has: jest.fn(),
        getAll: jest.fn(),
        keys: jest.fn()
      });

      // Act
      component.ngOnInit();
 
      expect(mockCountriesService.getCountryByCode).not.toHaveBeenCalled();
    });
  });
});