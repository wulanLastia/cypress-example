import kop_surat, { checkradio3 } from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kop_surat"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingKopSuratPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingKopSurat() {
        draftingKonsepNaskahPage.aksesFormKopSurat()
    }

    checkDetail() {
        const titleKop = cy.get(kop_surat.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
            .and('be.visible')

        const subTitleKop = cy.get(kop_surat.subTitleKop).as('subTitleKop')
        subTitleKop.should('contain', 'Level Kop Surat')
            .and('be.visible')

        const radioKop1 = cy.get(kop_surat.radioKop1).as('radioKop1')
        radioKop1.should('contain', 'Sekretaris Daerah')
            .and('be.visible')

        const radioKop2 = cy.get(kop_surat.radioKop2).as('radioKop2')
        radioKop2.should('contain', 'Dinas/Badan')
            .and('be.visible')

        const radioKop3 = cy.get(kop_surat.radioKop3).as('radioKop3')
        radioKop3.should('contain', 'UPTD/Cabang Dinas')
            .and('be.visible')
    }

    checkPreviewDefault() {
        const defaultSelectedRadio = cy.get(kop_surat.defaultSelectedRadio).as('defaultSelectedRadio')
        defaultSelectedRadio.should('be.checked')

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

    checkPreviewSekda() {
        const checkRadio1 = cy.get(kop_surat.checkRadio1).as('checkRadio1')
        checkRadio1.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/6d0b277d4b29db3eafab2d5708149d7d.png')
    }

    checkPreviewDinas() {
        const checkRadio2 = cy.get(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

    checkPreviewUPTD() {
        const checkRadio3 = cy.get(kop_surat.checkRadio3).as('checkRadio3')
        checkRadio3.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

    closeKopSurat() {
        const closeKopSurat = cy.get(kop_surat.closeKopSurat).as('closeKopSurat')
        closeKopSurat.should('be.visible')
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

}