import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCardComponent } from './info-card';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    
    // Configurar inputs obrigatórios
    component.icon = 'test-icon';
    component.title = 'Test Title';
    component.value = 'Test Value';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided values', () => {
    expect(component.icon).toBe('test-icon');
    expect(component.title).toBe('Test Title');
    expect(component.value).toBe('Test Value');
    expect(component.theme).toBe('default');
  });
});
