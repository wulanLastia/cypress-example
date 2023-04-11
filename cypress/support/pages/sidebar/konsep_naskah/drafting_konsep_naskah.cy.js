import navbar from "../../../selectors/navbar"
import menu from "../../../selectors/sidebar/menu/menu"
import konsep_naskah from "../../../selectors/sidebar/konsep_naskah/konsep_naskah"

import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingKonsepNaskahPage {

    checkKonsepNaskah() {
        const titleKonsepNaskah = cy.xpath(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.xpath(konsep_naskah.subTitleKonsepNaskah).as('subTitleKonsepNaskah')
        subTitleKonsepNaskah.should('contain', 'TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.xpath(konsep_naskah.suratBiasa).as('suratBiasa')
        suratBiasa.should('be.visible')
            .click()
    }

    clickbtnKembali() {
        const btnKembali = cy.xpath(konsep_naskah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()
    }

    checkPreviewNaskah() {
        const previewKop = cy.xpath(konsep_naskah.previewKop).as('previewKop')
        previewKop.click(180, 60)

        const titleKop = cy.xpath(konsep_naskah.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')

        const previewKepala = cy.xpath(konsep_naskah.previewKepala).as('previewKepala')
        previewKepala.click(180, 240)

        const titleKepala = cy.xpath(konsep_naskah.titleKepala).as('titleKepala')
        titleKepala.should('contain', 'Kepala Surat')

        const previewBadan = cy.xpath(konsep_naskah.previewBadan).as('previewBadan')
        previewKepala.click(180, 360)

        const titleBadan = cy.xpath(konsep_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')

        const previewKaki = cy.xpath(konsep_naskah.previewKaki).as('previewKaki')
        previewKaki.click(180, 560)

        const titleKaki = cy.xpath(konsep_naskah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')

        const titleLampiran = cy.xpath(konsep_naskah.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Klik tombol berikut untuk menambah lampiran')
    }

    checkDetail() {
        this.checkKonsepNaskah()

        const btnKembali = cy.xpath(konsep_naskah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleMenu = cy.xpath(konsep_naskah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const selectedKonsep = cy.xpath(konsep_naskah.selectedKonsep).as('selectedKonsep')
        selectedKonsep.select('Surat Biasa')

        const btnKirimNaskah = cy.xpath(konsep_naskah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim Naskah')
            .and('be.visible')

        const editFormDefault = cy.xpath(konsep_naskah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')

        this.checkPreviewNaskah()
    }

    batalDrafting() {
        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.xpath(konsep_naskah.btnBatalDrafting).as('btnBatalDrafting')
        btnBatalDrafting.should('contain', 'Ya, batalkan')
            .and('be.visible')
            .click()

        const titleKonsepNaskah2 = cy.xpath(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah2.should('contain', 'Buat Naskah Baru')
            .and('be.visible')
    }

    lanjutkanDrafting() {
        this.checkKonsepNaskah()

        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnLanjutkanDrafting = cy.xpath(konsep_naskah.btnLanjutkanDrafting).as('btnLanjutkanDrafting')
        btnLanjutkanDrafting.should('contain', 'Tidak')
            .and('be.visible')
            .click()

        const titleMenu = cy.xpath(konsep_naskah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

}