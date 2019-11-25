import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparacaoReceitaPageRoutingModule } from './preparacao-receita-routing.module';

import { PreparacaoReceitaPage } from './preparacao-receita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparacaoReceitaPageRoutingModule
  ],
  declarations: [PreparacaoReceitaPage]
})
export class PreparacaoReceitaPageModule {}
