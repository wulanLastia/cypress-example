import kop_surat, { checkradio3 } from "../../../selectors/sidebar/konsep_naskah/drafting_kop_surat"
import konsep_naskah from "../../../selectors/sidebar/konsep_naskah/konsep_naskah"

import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingKopSuratPage {

    aksesFormKopSurat() {
        this.checkKonsepNaskah()

        cy.wait(3000)

        const previewKop = cy.xpath(kop_surat.previewKop).as('previewKop')
        previewKop.click(180, 60)

        const titleKop = cy.xpath(kop_surat.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
    }

    checkKonsepNaskah() {
        const titleKonsepNaskah = cy.xpath(kop_surat.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(kop_surat.subTitleKonsepNaskah).as('subTitleKonsepNaskah')
        subTitleKonsepNaskah.should('contain', 'TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.xpath(kop_surat.suratBiasa).as('suratBiasa')
        suratBiasa.should('be.visible')
            .click()
    }

    clickbtnKembali() {
        const btnKembali = cy.xpath(konsep_naskah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()
    }

    checkDetail() {
        const titleKop = cy.xpath(kop_surat.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
            .and('be.visible')

        const subTitleKop = cy.xpath(kop_surat.subTitleKop).as('subTitleKop')
        subTitleKop.should('contain', 'Level Kop Surat')
            .and('be.visible')

        const radioKop1 = cy.xpath(kop_surat.radioKop1).as('radioKop1')
        radioKop1.should('contain', 'Sekretaris Daerah')
            .and('be.visible')

        const radioKop2 = cy.xpath(kop_surat.radioKop2).as('radioKop2')
        radioKop2.should('contain', 'Dinas/Badan')
            .and('be.visible')

        const radioKop3 = cy.xpath(kop_surat.radioKop3).as('radioKop3')
        radioKop3.should('contain', 'UPTD/Cabang Dinas')
            .and('be.visible')
    }

    checkPreviewDefault() {
        const defaultSelectedRadio = cy.xpath(kop_surat.defaultSelectedRadio).as('defaultSelectedRadio')
        defaultSelectedRadio.should('be.checked')

        const previewSelectedKop = cy.xpath(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

    checkPreviewSekda() {
        const checkRadio1 = cy.xpath(kop_surat.checkRadio1).as('checkRadio1')
        checkRadio1.click()

        const previewSelectedKop = cy.xpath(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/6d0b277d4b29db3eafab2d5708149d7d.png')
    }

    checkPreviewDinas() {
        const checkRadio2 = cy.xpath(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()

        const previewSelectedKop = cy.xpath(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

    checkPreviewUPTD() {
        const checkRadio3 = cy.xpath(kop_surat.checkRadio3).as('checkRadio3')
        checkRadio3.click()

        const previewSelectedKop = cy.xpath(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

    closeKopSurat() {
        const closeKopSurat = cy.xpath(kop_surat.closeKopSurat).as('closeKopSurat')
        closeKopSurat.should('be.visible')
            .click()

        const editFormDefault = cy.xpath(konsep_naskah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

}