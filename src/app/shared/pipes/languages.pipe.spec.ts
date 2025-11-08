import { LanguagesPipe } from './languages.pipe';

describe('LanguagesPipe', () => {
  let pipe: LanguagesPipe;

  beforeEach(() => {
    pipe = new LanguagesPipe();
  });

  describe('Regras de Formatação de Idiomas', () => {
    
    it('deve formatar múltiplos idiomas separados por vírgula', () => {
      const languages = {
        por: 'Portuguese',
        eng: 'English',
        spa: 'Spanish'
      };

      const result = pipe.transform(languages);

      expect(result).toBe('Portuguese, English, Spanish');
    });

    it('deve formatar um único idioma corretamente', () => {
      const languages = {
        por: 'Portuguese'
      };

      const result = pipe.transform(languages);

      expect(result).toBe('Portuguese');
    });

    it('deve retornar "N/A" quando idiomas é undefined', () => {
      const languages = undefined;

      const result = pipe.transform(languages);

      expect(result).toBe('N/A');
    });

    it('deve retornar "N/A" quando objeto de idiomas é vazio', () => {
      const languages = {};

      const result = pipe.transform(languages);

      expect(result).toBe('N/A');
    });

    it('deve manter a ordem dos idiomas como estão no objeto', () => {
      const languages = {
        jpn: 'Japanese',
        eng: 'English',
        fra: 'French'
      };

      const result = pipe.transform(languages);

      expect(result).toBe('Japanese, English, French');
    });
  });

  describe('Casos Específicos de Formatação', () => {
    
    it('deve lidar com nomes de idiomas com caracteres especiais', () => {
      const languages = {
        ara: 'العربية',
        chi: '中文'
      };

      const result = pipe.transform(languages);

      expect(result).toBe('العربية, 中文');
    });

    it('deve lidar com nomes longos de idiomas', () => {
      const languages = {
        grn: 'Guaraní'
      };

      const result = pipe.transform(languages);

      expect(result).toBe('Guaraní');
    });

    it('deve lidar com muitos idiomas sem problemas de performance', () => {
      const languages = {
        por: 'Portuguese',
        eng: 'English',
        spa: 'Spanish',
        fra: 'French',
        deu: 'German',
        ita: 'Italian',
        jpn: 'Japanese',
        kor: 'Korean',
        chi: 'Chinese',
        rus: 'Russian'
      };

      const result = pipe.transform(languages);

      expect(result).toBe('Portuguese, English, Spanish, French, German, Italian, Japanese, Korean, Chinese, Russian');
     });
  });
});
