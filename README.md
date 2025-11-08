# World Explorer

Uma aplicação web moderna para explorar informações sobre países do mundo, desenvolvida com Angular 19 e TypeScript.

## Descrição do Projeto

O World Explorer é uma aplicação interativa que permite aos usuários navegar e descobrir informações detalhadas sobre países de todo o mundo. A aplicação consome a API REST Countries para fornecer dados atualizados sobre população, capital, idiomas, moedas, fusos horários e muito mais.

### Funcionalidades Principais

-  **Lista de Países**: Visualização de todos os países com informações básicas
-  **Detalhes do País**: Informações completas sobre cada país
-  **Bandeiras**: Exibição das bandeiras oficiais dos países
-  **Mapas Interativos**: Integração com Google Maps
-  **Design Responsivo**: Interface adaptada para desktop e mobile
-  **Performance Otimizada**: Carregamento rápido com cache inteligente
-  **UI/UX Moderna**: Interface limpa e intuitiva com Material Design

## Arquitetura

O projeto segue uma arquitetura modular e escalável baseada em:

### Estrutura de Pastas
```
src/
├── app/
│   ├── components/          # Componentes de páginas
│   │   ├── country-list/    # Lista de países
│   │   ├── country-details/ # Detalhes do país
│   │   ├── location/        # Componente de mapas
│   │   └── not-found/       # Página 404
│   ├── shared/              # Componentes reutilizáveis
│   │   ├── components/      # Botões, cards, etc.
│   │   └── pipes/           # Pipes customizados
│   ├── core/                # Serviços principais
│   │   ├── countries.ts     # Serviço da API
│   │   └── models/          # Interfaces TypeScript
│   └── app.routes.ts        # Configuração de rotas
```

### Padrões Arquiteturais

- **Standalone Components**: Componentes independentes do Angular 19
- **Reactive Programming**: Uso extensivo de RxJS para gerenciamento de estado
- **Service Layer**: Camada de serviços para comunicação com APIs
- **Component-Based**: Arquitetura baseada em componentes reutilizáveis
- **Lazy Loading**: Carregamento otimizado de componentes
- **Server-Side Rendering (SSR)**: Suporte a renderização do lado do servidor

## Tecnologias Utilizadas

### Frontend
- **Angular 19** - Framework principal escolhido por sua robustez, TypeScript nativo e excelente tooling
- **TypeScript** - Linguagem principal para type safety 
- **Angular Material** - Biblioteca de componentes UI para design consistente
- **RxJS** - Gerenciamento reativo de estado e operações assíncronas (usando BehaviorSubject para cache de dados)
- **SCSS** - Pré-processador CSS para estilização avançada

### Ferramentas de Desenvolvimento
- **Jest** - Framework de testes escolhido por sua velocidade e facilidade de uso
- **Angular CLI** - Tooling para build, desenvolvimento e deploy
- **ESLint/Prettier** - Linting e formatação de código

### API Externa
- **REST Countries API** - Fonte de dados dos países (gratuita e confiável)

### Por que essas tecnologias?

1. **Angular 19**: Framework maduro com excelente suporte a TypeScript, SSR nativo e performance otimizada
2. **TypeScript**: Type safety reduz bugs em produção e melhora a experiência de desenvolvimento
3. **Angular Material**: Componentes testados e acessíveis seguindo Material Design
4. **Jest**: Testes mais rápidos que Karma/Jasmine, melhor experiência de debugging
5. **RxJS**: Perfeito para gerenciar operações assíncronas e estados reativos com BehaviorSubject para manter cache e valores iniciais
6. **SCSS**: Maior flexibilidade para estilização com variáveis e mixins

## Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn instalado

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Rosines-Almeida/world_explorer.git
cd world_explorer

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:4200`

### Outros comandos úteis
```bash
# Build para produção
npm run build

# Servir build de produção
npm run serve:ssr:world

# Modo watch (rebuild automático)
npm run watch

# Executar Storybook
npm run storybook

# Executar Storybook em modo dev
npm run storybook-dev
```

## Como Executar os Testes

O projeto utiliza Jest como framework de testes para melhor performance e experiência de desenvolvimento.

### Comandos de Teste
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta ao salvar)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Estrutura de Testes
- **Testes Unitários**: Cada componente e serviço possui seus testes correspondente (`.spec.ts`)
- **Cobertura de Código**: Relatórios gerados na pasta `coverage/`
- **Mocks**: Mocks de serviços e dependências externas
- **Test Utilities**: Utilitários para setup e teardown de testes

### Exemplo de Saída de Cobertura
```
File                     | % Stmts | % Branch | % Funcs | % Lines
-------------------------|---------|----------|---------|--------
All files               |   92.5  |   87.2   |   94.1  |   93.8
 components/            |   95.2  |   91.3   |   96.7  |   94.9
 services/              |   89.1  |   82.5   |   90.2  |   91.4
 pipes/                 |   98.3  |   95.1   |   100   |   98.3
```

## Build e Deploy

### Build de Produção
```bash
# Build otimizado para produção
npm run build

# Os arquivos estarão em dist/world
```

### Build com SSR
```bash
# Build com Server-Side Rendering
npm run build

# Servir aplicação com SSR
npm run serve:ssr:world
```

## Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Desenvolvedor

**Rosines Almeida**
- GitHub: [@Rosines-Almeida](https://github.com/Rosines-Almeida)

---

 Se este projeto foi útil para você, considere dar uma estrela no repositório!
