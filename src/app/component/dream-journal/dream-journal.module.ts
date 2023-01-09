import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DreamJournalPageRoutingModule } from './dream-journal-routing.module';

import { DreamJournalPage } from './dream-journal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DreamJournalPageRoutingModule
  ],
  declarations: [DreamJournalPage]
})
export class DreamJournalPageModule {}
