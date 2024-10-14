import kop_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kop_surat"
import { DraftingNotaDinasPage } from "../nota_dinas/pgs_drafting_nota_dinas.cy"

const draftingNotaDinasPage = new DraftingNotaDinasPage()

export class DraftingKopSuratNotaDinasPage {

    aksesFormEditingKopSurat() {
        draftingNotaDinasPage.aksesFormKopSurat()
    }

    checkDetail() {
        const titleKop = cy.get(kop_surat.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')

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

    checkPreviewDefault(inputOrg) {
        const defaultSelectedRadio = cy.get(kop_surat.defaultSelectedRadio).as('defaultSelectedRadio')
        defaultSelectedRadio.should('be.checked')

        if(inputOrg == 'dispusipda') {
            const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
            previewSelectedKop.find('img')
                .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
        } else {
            const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
            previewSelectedKop.find('img')
                .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/89c72083b0261a4a48569fd26d2d2b6d.png')
        }
    }

    checkPreviewDefaultPROD() {
        const defaultSelectedRadio = cy.get(kop_surat.defaultSelectedRadio).as('defaultSelectedRadio')
        defaultSelectedRadio.should('be.checked')

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/38a80733a1c6437c596c4568e1d263d4.PNG')
    }

    checkPreviewSekda() {
        const checkRadio1 = cy.get(kop_surat.checkRadio1).as('checkRadio1')
        checkRadio1.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://devsidebar.digitalservice.id/FilesUploaded/kop/d800bd29e2cfa7b2ca89928aea3300b5.png')
    }

    checkPreviewDinas(inputOrg) {
        const checkRadio2 = cy.get(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()

        if(inputOrg == 'dispusipda') {
            const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
            previewSelectedKop.find('img')
                .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
        } else {
            const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
            previewSelectedKop.find('img')
                .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/89c72083b0261a4a48569fd26d2d2b6d.png')
        }
    }

    checkPreviewUPTD(inputOrg) {
        const checkRadio3 = cy.get(kop_surat.checkRadio3).as('checkRadio3')
        checkRadio3.click()

        if(inputOrg == 'dispusipda') {
            const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
            previewSelectedKop.find('img')
                .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
        } else {
            const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
            previewSelectedKop.find('img')
                .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/89c72083b0261a4a48569fd26d2d2b6d.png')
        }
    }

    closeKopSurat() {
        const closeKopSurat = cy.get(kop_surat.closeKopSurat).as('closeKopSurat')
        closeKopSurat.scrollIntoView()
            .click()

        draftingNotaDinasPage.validateFormDefault()
    }


    // ACTIONS
    clickPreviewSekda() {
        const checkRadio1 = cy.get(kop_surat.checkRadio1).as('checkRadio1')
        checkRadio1.click()
    }

    clickPreviewDinas() {
        const checkRadio2 = cy.get(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()
    }

    clickPreviewUPTD() {
        const checkRadio3 = cy.get(kop_surat.checkRadio3).as('checkRadio3')
        checkRadio3.click()
    }

    // PROD
    prodCheckPreviewDinas() {
        const checkRadio2 = cy.get(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            //.should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/38a80733a1c6437c596c4568e1d263d4.PNG')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/89c72083b0261a4a48569fd26d2d2b6d.png')
    }

}