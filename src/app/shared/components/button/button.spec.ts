import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('deve emitir evento de clique quando não está desabilitado', () => {
      component.disabled = false;
      const emitSpy = jest.spyOn(component.onClick, 'emit');
      const mockEvent = new Event('click');

       component.onButtonClick(mockEvent);

       expect(emitSpy).toHaveBeenCalledWith(mockEvent);
    });

     it('NÃO deve emitir evento de clique quando está desabilitado', () => {
       component.disabled = true;
      const emitSpy = jest.spyOn(component.onClick, 'emit');
      const mockEvent = new Event('click');

       component.onButtonClick(mockEvent);

       expect(emitSpy).not.toHaveBeenCalled();
    });
   it('NÃO deve emitir evento de clique quando está desabilitado', () => {
       component.disabled = true;
      const emitSpy = jest.spyOn(component.onClick, 'emit');
      const mockEvent = new Event('click');

       component.onButtonClick(mockEvent);

       expect(emitSpy).not.toHaveBeenCalled();
    });
   
      it('deve ter valores padrão corretos', () => {
      expect(component.variant).toBe('primary');
      expect(component.size).toBe('md');
      expect(component.disabled).toBe(false);
      expect(component.type).toBe('button');
      expect(component.fullWidth).toBe(false);
    });

     it('deve aceitar diferentes variantes', () => {
       component.variant = 'danger';
      fixture.detectChanges();

       expect(component.variant).toBe('danger');
    });

     it('deve aceitar diferentes tamanhos', () => {
       component.size = 'sm';
      fixture.detectChanges();

       expect(component.size).toBe('sm');
    });

    it('deve aceitar diferentes tipos', () => {
       component.type = 'submit';
      fixture.detectChanges();

       expect(component.type).toBe('submit');
    });

    it('deve aceitar configuração de largura total', () => {
       component.fullWidth = true;
      fixture.detectChanges();

       expect(component.fullWidth).toBe(true);
    });
  
     it('deve renderizar com classes CSS corretas para variante primary', () => {
       component.variant = 'primary';
      fixture.detectChanges();

       const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');

       expect(buttonElement.classList.contains('btn-primary')).toBe(true);
    });

    
    it('deve renderizar com classes CSS corretas para variante danger', () => {
       component.variant = 'danger';
      fixture.detectChanges();

      const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      expect(buttonElement.classList.contains('btn-danger')).toBe(true);
    });

    it('deve ter atributo disabled quando desabilitado', () => {
      component.disabled = true;
      fixture.detectChanges();

      const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      expect(buttonElement.disabled).toBe(true);
    });

     it('deve ter type submit quando configurado', () => {
      component.type = 'submit';
      fixture.detectChanges();

      const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      expect(buttonElement.type).toBe('submit');
    });
});
