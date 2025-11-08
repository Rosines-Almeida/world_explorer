import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryCardComponent } from './country-card';
import { CountryModel } from '../../../core/models/country.model';


describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  const mockCountry: CountryModel = {
    name: { common: 'Test Country' },
    flags: { png: 'test.png', svg: 'test.svg' , alt:''},
    cca3: 'TST',
    region: 'Test Region',
    capital: ['Test Capital'],
    timezones: ['UTC+0']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCardComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCardComponent);
    component = fixture.componentInstance;
    component.country = mockCountry; // Fornece o input necessário
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir viewDetails no clique do card quando não está saindo', () => {
      // Arrange
      component.isExiting = false;
      const emitSpy = jest.spyOn(component.viewDetails, 'emit');

      // Act
      component.onCardClick();

      // Assert
      expect(emitSpy).toHaveBeenCalledWith('TST');
    });

    it('NÃO deve emitir viewDetails no clique do card quando está saindo', () => {
      // Arrange
      component.isExiting = true;
      const emitSpy = jest.spyOn(component.viewDetails, 'emit');

      // Act
      component.onCardClick();

      // Assert
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('deve emitir viewDetails no botão de detalhes com stopPropagation', () => {
      // Arrange
      const emitSpy = jest.spyOn(component.viewDetails, 'emit');
      const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

      // Act
      component.onViewDetails(mockEvent, 'TST');

      // Assert
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith('TST');
    });

    it('deve emitir delete com animação e stopPropagation', () => {
      // Arrange
      jest.useFakeTimers();
      const emitSpy = jest.spyOn(component.delete, 'emit');
      const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

      // Act
      component.onDelete(mockEvent, 'TST');

      // Assert - Primeiro deve setar isExiting para true
      expect(component.isExiting).toBe(true);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      // Avança os timers e verifica se emite o delete
      jest.advanceTimersByTime(400);
      expect(emitSpy).toHaveBeenCalledWith('TST');

      jest.useRealTimers();
    });


  describe('Renderização de Dados', () => {
    
    it('deve renderizar informações do país corretamente', () => {
      // Arrange
      fixture.detectChanges();

      // Act
      const nativeElement = fixture.nativeElement;
      const countryName = nativeElement.querySelector('h2');
      const detailsItems = nativeElement.querySelectorAll('.details li');

      // Assert
      expect(countryName).toBeTruthy();
      expect(countryName.textContent).toContain('Test Country');
      
      expect(detailsItems.length).toBe(3);
      expect(detailsItems[0].textContent).toContain('Test Capital');
      expect(detailsItems[1].textContent).toContain('Test Region');
      expect(detailsItems[2].textContent).toContain('UTC+0');
    });

    it('deve renderizar a bandeira com atributos corretos', () => {
      // Arrange
      fixture.detectChanges();

      // Act
      const flagImg: HTMLImageElement = fixture.nativeElement.querySelector('.flag');

      // Assert
        expect(flagImg).toBeTruthy(); // Verifica se o elemento existe
        expect(flagImg.alt).toBe('Test Country');
    });
  });

  describe('Comportamento de Animações', () => {
    
    it('deve iniciar com isExiting como false', () => {
      // Assert
      expect(component.isExiting).toBe(false);
    });

    it('deve setar isExiting como true durante deleção', () => {
      // Arrange
      const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

      // Act
      component.onDelete(mockEvent, 'TST');

      // Assert
      expect(component.isExiting).toBe(true);
    });
  });

  describe('Interação com Botões', () => {
    
    it('deve ter botão de viewDetails com comportamento correto', () => {
      // Arrange
      fixture.detectChanges();
      const viewDetailsButtons = fixture.nativeElement.querySelectorAll('app-button');
      const viewDetailsButton = Array.from(viewDetailsButtons).find((btn: any) => 
        btn.getAttribute('variant') === 'primary'
      ) as HTMLElement;
      const clickSpy = jest.spyOn(component, 'onViewDetails');

      // Act
      expect(viewDetailsButton).toBeTruthy(); // Verifica se o botão existe
      // Simula o clique no botão HTML interno do componente app-button
      const htmlButton = viewDetailsButton.querySelector('button');
      expect(htmlButton).toBeTruthy();
      htmlButton!.click();

      // Assert
      expect(clickSpy).toHaveBeenCalled();
    });

    it('deve ter botão de delete com comportamento correto', () => {
      // Arrange
      fixture.detectChanges();
      const deleteButtons = fixture.nativeElement.querySelectorAll('app-button');
      const deleteButton = Array.from(deleteButtons).find((btn: any) => 
        btn.getAttribute('variant') === 'danger'
      ) as HTMLElement;
      const clickSpy = jest.spyOn(component, 'onDelete');

      // Act
      expect(deleteButton).toBeTruthy(); // Verifica se o botão existe
      // Simula o clique no botão HTML interno do componente app-button
      const htmlButton = deleteButton.querySelector('button');
      expect(htmlButton).toBeTruthy();
      htmlButton!.click();

      // Assert
      expect(clickSpy).toHaveBeenCalled();
    });
  });
    });

