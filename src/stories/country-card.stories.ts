import type { Meta, StoryObj } from '@storybook/angular';
 import { CountryModel } from '../app/core/models/country.model';
import { CountryCardComponent } from '../app/shared/components/app-country-card/country-card';

const mockCountry: CountryModel = {
  cca3: 'BRA',
  name: { common: 'Brazil' },
  flags: { png: 'https://flagcdn.com/w320/br.png', svg: '', alt: 'Brazil flag' },
  region: 'Americas',
  capital: ['Brasília'],
  timezones: ['UTC-03:00']
};

const mockCountry2: CountryModel = {
  cca3: 'USA',
  name: { common: 'United States'  },
  flags: { png: 'https://flagcdn.com/w320/us.png', svg: '', alt: 'US flag' },
  region: 'Americas',
  capital: ['Washington, D.C.'],
  timezones: ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00']
};

const meta: Meta<CountryCardComponent> = {
  title: 'COUNTRIES/CountryCard',
  component: CountryCardComponent,
};

export default meta;
type Story = StoryObj<CountryCardComponent>;

export const Brazil: Story = {
  args: {
    country: mockCountry
  },
};

export const UnitedStates: Story = {
  args: {
    country: mockCountry2
  },
};

export const NoCapital: Story = {
  args: {
    country: {
      ...mockCountry,
      capital: []
    }
  },
};