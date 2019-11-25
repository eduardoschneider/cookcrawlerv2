import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreparacaoReceitaPage } from './preparacao-receita.page';

const routes: Routes = [
  {
    path: '',
    component: PreparacaoReceitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreparacaoReceitaPageRoutingModule {}
