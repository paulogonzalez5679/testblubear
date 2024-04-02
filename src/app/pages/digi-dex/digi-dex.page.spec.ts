import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigiDexPage } from './digi-dex.page';

describe('DigiDexPage', () => {
  let component: DigiDexPage;
  let fixture: ComponentFixture<DigiDexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DigiDexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
