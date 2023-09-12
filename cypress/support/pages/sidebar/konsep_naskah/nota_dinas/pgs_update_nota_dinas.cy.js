import { DraftingNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/pgs_drafting_nota_dinas.cy"
import { DraftingKopSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kop_surat.cy"
import { DraftingKepalaSuratNotaDinasPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kepala_surat.cy"
import { DraftingLampiranSuratPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_lampiran_surat.cy"
import { DraftingBadanNaskahPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_badan_surat.cy.js"
import { DraftingKakiSuratPage } from "../../../../../support/pages/sidebar/konsep_naskah/nota_dinas/nodin_drafting_kaki_surat.cy.js"


const draftingNotaDinasPage = new DraftingNotaDinasPage()
const draftingKopSuratNotaDinasPage = new DraftingKopSuratNotaDinasPage()
const draftingKepalaSuratNotaDinasPage = new DraftingKepalaSuratNotaDinasPage()
const draftingLampiranSuratPage = new DraftingLampiranSuratPage()
const draftingBadanNaskahPage = new DraftingBadanNaskahPage()
const draftingKakiSuratPage = new DraftingKakiSuratPage()

export class UpdateNotaDinasPage {
        // Perbaiki
        inputPerbaikiKepalaSurat() {
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
            draftingKepalaSuratNotaDinasPage.inputPerihal(' Perbaiki')
            draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
        }
    
        // Koreksi
        inputKoreksiKepalaSurat() {
            draftingKepalaSuratNotaDinasPage.aksesFormEditingKepalaSurat()
            draftingKepalaSuratNotaDinasPage.inputPerihal(' Koreksi')
            draftingKepalaSuratNotaDinasPage.closeKepalaSurat()
        }
    
}