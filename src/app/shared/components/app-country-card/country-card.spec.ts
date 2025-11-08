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
    component.country = mockCountry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir viewDetails no clique do card quando não está saindo', () => {
      component.isExiting = false;
      const emitSpy = jest.spyOn(component.viewDetails, 'emit');

      component.onCardClick();

      expect(emitSpy).toHaveBeenCalledWith('TST');
    });

    it('NÃO deve emitir viewDetails no clique do card quando está saindo', () => {
      component.isExiting = true;
      const emitSpy = jest.spyOn(component.viewDetails, 'emit');

      component.onCardClick();

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('deve emitir viewDetails no botão de detalhes com stopPropagation', () => {
      const emitSpy = jest.spyOn(component.viewDetails, 'emit');
      const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

      component.onViewDetails(mockEvent, 'TST');

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith('TST');
    });

    it('deve emitir delete com animação e stopPropagation', () => {
      jest.useFakeTimers();
      const emitSpy = jest.spyOn(component.delete, 'emit');
      const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

      component.onDelete(mockEvent, 'TST');

      expect(component.isExiting).toBe(true);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      jest.advanceTimersByTime(400);
      expect(emitSpy).toHaveBeenCalledWith('TST');

      jest.useRealTimers();
    });


  describe('Renderização de Dados', () => {
    
    it('deve renderizar informações do país corretamente', () => {
      fixture.detectChanges();

      const nativeElement = fixture.nativeElement;
      const countryName = nativeElement.querySelector('h2');
      const detailsItems = nativeElement.querySelectorAll('.details li');

      expect(countryName).toBeTruthy();
      expect(countryName.textContent).toContain('Test Country');
      
      expect(detailsItems.length).toBe(3);
      expect(detailsItems[0].textContent).toContain('Test Capital');
      expect(detailsItems[1].textContent).toContain('Test Region');
      expect(detailsItems[2].textContent).toContain('UTC+0');
    });

    it('deve renderizar a bandeira com atributos corretos', () => {
      fixture.detectChanges();

      const flagImg: HTMLImageElement = fixture.nativeElement.querySelector('.flag');

        expect(flagImg).toBeTruthy(); 
        expect(flagImg.alt).toBe('Test Country');
    });
  });

  describe('Comportamento de Animações', () => {
    
    it('deve iniciar com isExiting como false', () => {
      expect(component.isExiting).toBe(false);
    });

    it('deve setar isExiting como true durante deleção', () => {
      const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

      component.onDelete(mockEvent, 'TST');

      expect(component.isExiting).toBe(true);
    });
  });

  describe('Interação com Botões', () => {
    
    it('deve ter botão de viewDetails com comportamento correto', () => {
      fixture.detectChanges();
      const viewDetailsButtons = fixture.nativeElement.querySelectorAll('app-button');
      const viewDetailsButton = Array.from(viewDetailsButtons).find((btn: any) => 
        btn.getAttribute('variant') === 'primary'
      ) as HTMLElement;
      const clickSpy = jest.spyOn(component, 'onViewDetails');

      expect(viewDetailsButton).toBeTruthy();
      const htmlButton = viewDetailsButton.querySelector('button');
      expect(htmlButton).toBeTruthy();
      htmlButton!.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('deve ter botão de delete com comportamento correto', () => {
      fixture.detectChanges();
      const deleteButtons = fixture.nativeElement.querySelectorAll('app-button');
      const deleteButton = Array.from(deleteButtons).find((btn: any) => 
        btn.getAttribute('variant') === 'danger'
      ) as HTMLElement;
      const clickSpy = jest.spyOn(component, 'onDelete');

      expect(deleteButton).toBeTruthy(); 
      const htmlButton = deleteButton.querySelector('button');
      expect(htmlButton).toBeTruthy();
      htmlButton!.click();

      expect(clickSpy).toHaveBeenCalled();
    });
  });
    });

