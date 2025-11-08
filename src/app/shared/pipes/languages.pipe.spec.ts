import { LanguagesPipe } from './languages.pipe';

describe('LanguagesPipe', () => {
  let pipe: LanguagesPipe;

  beforeEach(() => {
    pipe = new LanguagesPipe();
  });

  describe('Regras de Formatação de Idiomas', () => {
    
    it('deve formatar múltiplos idiomas separados por vírgula', () => {
      // Arrange
      const languages = {
        por: 'Portuguese',
        eng: 'English',
        spa: 'Spanish'
      };

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('Portuguese, English, Spanish');
    });

    it('deve formatar um único idioma corretamente', () => {
      // Arrange
      const languages = {
        por: 'Portuguese'
      };

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('Portuguese');
    });

    it('deve retornar "N/A" quando idiomas é undefined', () => {
      // Arrange
      const languages = undefined;

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('N/A');
    });

    it('deve retornar "N/A" quando objeto de idiomas é vazio', () => {
      // Arrange
      const languages = {};

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('N/A');
    });

    it('deve manter a ordem dos idiomas como estão no objeto', () => {
      // Arrange
      const languages = {
        jpn: 'Japanese',
        eng: 'English',
        fra: 'French'
      };

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('Japanese, English, French');
    });
  });

  describe('Casos Específicos de Formatação', () => {
    
    it('deve lidar com nomes de idiomas com caracteres especiais', () => {
      // Arrange
      const languages = {
        ara: 'العربية',
        chi: '中文'
      };

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('العربية, 中文');
    });

    it('deve lidar com nomes longos de idiomas', () => {
      // Arrange
      const languages = {
        grn: 'Guaraní'
      };

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('Guaraní');
    });

    it('deve lidar com muitos idiomas sem problemas de performance', () => {
      // Arrange
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

      // Act
      const result = pipe.transform(languages);

      // Assert
      expect(result).toBe('Portuguese, English, Spanish, French, German, Italian, Japanese, Korean, Chinese, Russian');
     });
  });
});