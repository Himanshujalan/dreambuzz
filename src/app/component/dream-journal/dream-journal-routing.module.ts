import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DreamJournalPage } from './dream-journal.page';

const routes: Routes = [
  {
    path: '',
    component: DreamJournalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DreamJournalPageRoutingModule {}
