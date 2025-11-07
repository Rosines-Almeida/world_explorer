import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountryListComponent } from './country-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';

 
describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryListComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
