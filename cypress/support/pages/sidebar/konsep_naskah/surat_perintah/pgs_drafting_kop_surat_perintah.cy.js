import kop_surat from "../../../../selectors/sidebar/konsep_naskah/surat_perintah/drafting_surat_perintah_kop_surat"
import { DraftingSuratPerintahPage } from "../surat_perintah/pgs_drafting_surat_perintah.cy"

const getJSONRequestFileKopSuratPerintah = "cypress/fixtures/non_cred/surat_perintah/kop_surat/kop_super_list_dropdown_UPTD.json"

const draftingSuratPerintahPage = new DraftingSuratPerintahPage()

export class DraftingKopSuratPerintahPage {

    aksesFormEditingKopSurat() {
        draftingSuratPerintahPage.aksesFormKopSurat()
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

    checkDropdownUPTD() {
        cy.readFile(getJSONRequestFileKopSuratPerintah).then((jsonData) => {

        const checkDropDownUPTDCabangDinas = cy.get(kop_surat.dropdownUPTDCabangDinas).as('checkDropDownUPTDCabangDinas')
        checkDropDownUPTDCabangDinas.click()

        cy.wait(1000)

        // Assert the existence of the options
        // Add a more specific selector if needed instead of just 'li'
        cy.get(kop_surat.findDropDownMenuUPTDCabangDinas).should('be.visible').within(() => {
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[0].Option1).should('be.visible');
            cy.wait(1000)
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[1].Option2).should('be.visible');
            cy.wait(1000)
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[2].Option3).should('be.visible');
            cy.wait(1000)
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[3].Option4).should('be.visible');
            cy.wait(1000)
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[4].Option5).should('be.visible');
            cy.wait(1000)
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[5].Option6).should('be.visible');
            cy.wait(1000)
            cy.contains('li', jsonData.UPTD_Cabang_Dinas[6].Option7).should('be.visible');
            cy.wait(1000)
        })
    })


        // Close the dropdown
        cy.get(kop_surat.dropdownUPTDCabangDinas).click();
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

    closeKopSurat() {
        const closeKopSurat = cy.get(kop_surat.closeKopSurat).as('closeKopSurat')
        closeKopSurat.should('be.visible')
            .click()

        // draftingSuratPerintahPage.validateFormDefault()
    }



    // PROD
    prodCheckPreviewDinas() {
        const checkRadio2 = cy.get(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

}