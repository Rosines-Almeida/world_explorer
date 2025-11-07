import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonCardComponent } from './skeleton-card';

describe('SkeletonCardComponent', () => {
  let component: SkeletonCardComponent;
  let fixture: ComponentFixture<SkeletonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCardComponent], // ✅ Standalone Import
    }).compileComponents(); // ✅ Compila templateUrl
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
