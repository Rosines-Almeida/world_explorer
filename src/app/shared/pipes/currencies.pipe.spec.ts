import { CurrenciesPipe } from './currencies.pipe';

describe('CurrenciesPipe', () => {
  let pipe: CurrenciesPipe;

  beforeEach(() => {
    pipe = new CurrenciesPipe();
  });

  describe('Regras de Formatação de Moedas', () => {
    
    it('deve formatar múltiplas moedas corretamente', () => {
      const currencies = {
        USD: { name: 'US Dollar', symbol: '$' },
        EUR: { name: 'Euro', symbol: '€' }
      };

      const result = pipe.transform(currencies);

      expect(result).toBe('US Dollar ($), Euro (€)');
    });

    it('deve formatar uma única moeda corretamente', () => {
      const currencies = {
        BRL: { name: 'Brazilian Real', symbol: 'R$' }
      };

      const result = pipe.transform(currencies);

      expect(result).toBe('Brazilian Real (R$)');
    });

    it('deve retornar "N/A" quando não há moedas', () => {
      const currencies = undefined;

      const result = pipe.transform(currencies);

      expect(result).toBe('N/A');
    });

    it('deve retornar "N/A" quando objeto de moedas é vazio', () => {
      const currencies = {};

      const result = pipe.transform(currencies);

      expect(result).toBe('N/A');
    });

    it('deve manter a ordem das moedas como estão no objeto', () => {
      const currencies = {
        JPY: { name: 'Japanese Yen', symbol: '¥' },
        USD: { name: 'US Dollar', symbol: '$' },
        BRL: { name: 'Brazilian Real', symbol: 'R$' }
      };

      const result = pipe.transform(currencies);

      expect(result).toBe('Japanese Yen (¥), US Dollar ($), Brazilian Real (R$)');
    });
  });

  describe('Casos Específicos de Formatação', () => {
    
    it('deve lidar com símbolos especiais', () => {
      const currencies = {
        GBP: { name: 'British Pound', symbol: '£' },
        INR: { name: 'Indian Rupee', symbol: '₹' }
      };

      const result = pipe.transform(currencies);

      expect(result).toBe('British Pound (£), Indian Rupee (₹)');
    });

    it('deve lidar com nomes longos de moedas', () => {
      const currencies = {
        AWG: { name: 'Aruban Florin', symbol: 'ƒ' }
      };

      const result = pipe.transform(currencies);

      expect(result).toBe('Aruban Florin (ƒ)');
    });
  });
});
