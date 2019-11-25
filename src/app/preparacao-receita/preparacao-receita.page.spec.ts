import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreparacaoReceitaPage } from './preparacao-receita.page';

describe('PreparacaoReceitaPage', () => {
  let component: PreparacaoReceitaPage;
  let fixture: ComponentFixture<PreparacaoReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreparacaoReceitaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreparacaoReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
