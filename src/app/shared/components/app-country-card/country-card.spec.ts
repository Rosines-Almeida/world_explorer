import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryCardComponent } from './country-card';
import { CountryModel } from '../../../core/models/country.model';


describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  const mockCountry: CountryModel = {
    name: { common: 'Test Country' },
    flags: { png: 'test.png', svg: 'test.svg' },
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
});
