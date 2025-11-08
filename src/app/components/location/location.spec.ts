import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { MapModel } from '../../core/models/country.model';
import { Location } from './location';

describe('LocationComponent', () => {
  let component: Location;
  let fixture: ComponentFixture<Location>;
  let windowOpenSpy: jest.SpyInstance;

  const mockMaps: MapModel = {
    googleMaps: 'https://maps.google.com/brazil',
    openStreetMaps: 'https://openstreetmaps.org/brazil'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Location]
    }).compileComponents();

    fixture = TestBed.createComponent(Location);
    component = fixture.componentInstance;
    windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  describe('Abertura de Maps', () => {
    it('deve abrir Google Maps em nova aba', () => {
      component.maps = mockMaps;
      component.openGoogleMaps(mockMaps.googleMaps);
      
      expect(windowOpenSpy).toHaveBeenCalledWith(
        'https://maps.google.com/brazil',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('não deve quebrar quando URL é undefined', () => {
      component.openGoogleMaps(undefined);
      expect(windowOpenSpy).toHaveBeenCalledWith(undefined, '_blank', 'noopener,noreferrer');
    });

    it('deve abrir URL válida com segurança', () => {
      const testUrl = 'https://example.com/maps';
      component.openGoogleMaps(testUrl);
      
      expect(windowOpenSpy).toHaveBeenCalledWith(
        testUrl,
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Renderização', () => {
    it('deve renderizar botão quando maps está definido', () => {
      component.maps = mockMaps;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('app-button');
      expect(button).toBeTruthy();
    });

    it('não deve renderizar botão quando maps é undefined', () => {
      component.maps = undefined;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('app-button');
      expect(button).toBeFalsy();
    });

    it('deve chamar openGoogleMaps no clique do botão', () => {
      component.maps = mockMaps;
      fixture.detectChanges();

      const openMapsSpy = jest.spyOn(component, 'openGoogleMaps');
      const appButton = fixture.nativeElement.querySelector('app-button');
      const htmlButton = appButton.querySelector('button');
      
      expect(htmlButton).toBeTruthy();
      htmlButton.click();
      
      expect(openMapsSpy).toHaveBeenCalledWith(mockMaps.googleMaps);
    });
  });
});
