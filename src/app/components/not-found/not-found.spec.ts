import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotFoundComponent } from './not-found';
 
describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Navegação', () => {
    it('deve navegar para home ao chamar goBack', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Interação do Usuário', () => {
    it('deve chamar goBack no clique do botão', () => {
      const goBackSpy = jest.spyOn(component, 'goBack');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('app-button');
      button.click();

      expect(goBackSpy).toHaveBeenCalled();
    });
  });

  describe('Renderização', () => {
    it('deve renderizar mensagem de página não encontrada', () => {
      const title = fixture.nativeElement.querySelector('h1');
      const subtitle = fixture.nativeElement.querySelector('h2');
      const message = fixture.nativeElement.querySelector('p');

      expect(title.textContent).toContain('404');
      expect(subtitle.textContent).toContain('Página Não Encontrada');
      expect(message.textContent).toContain('não existe ou foi removido');
    });

    it('deve renderizar botão para voltar', () => {
      const button = fixture.nativeElement.querySelector('app-button');
      expect(button).toBeTruthy();
    });
  });
});