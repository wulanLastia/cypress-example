import konsep_naskah from "../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingKonsepNaskahPage {

    goToKonsepNaskahSuratBiasa() {
        const titleKonsepNaskah = cy.get(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')
            .and('be.visible')

        const subTitleKonsepNaskah = cy.get(konsep_naskah.subTitleKonsepNaskah).as('subTitleKonsepNaskah')
        subTitleKonsepNaskah.should('contain', 'TEMPLATE NASKAH')
            .and('be.visible')

        const suratBiasa = cy.get(konsep_naskah.suratBiasa).as('suratBiasa')
        suratBiasa.should('be.visible')
            .click()
    }

    clickbtnKembali() {
        const btnKembali = cy.get(konsep_naskah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()
    }

    checkPreviewNaskah() {
        this.aksesFormKopSurat()

        this.aksesFormKepalaSurat()

        this.aksesBadanNaskah()

        this.aksesKakiSurat()

        this.aksesLampiranSurat()
    }

    checkDetail() {
        this.goToKonsepNaskahSuratBiasa()

        const btnKembali = cy.get(konsep_naskah.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleMenu = cy.get(konsep_naskah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const selectedKonsep = cy.get(konsep_naskah.selectedKonsep).as('selectedKonsep')
        selectedKonsep.should('have.value', '/konsep-naskah/surat-biasa')

        const btnKirimNaskah = cy.get(konsep_naskah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim Naskah')
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

        const titleKonsepNaskah2 = cy.get(konsep_naskah.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah2.should('contain', 'Buat Naskah Baru')
            .and('be.visible')
    }

    lanjutkanDrafting() {
        this.goToKonsepNaskahSuratBiasa()

        this.clickbtnKembali()

        const titleBatalDrafting = cy.xpath(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnLanjutkanDrafting = cy.xpath(konsep_naskah.btnLanjutkanDrafting).as('btnLanjutkanDrafting')
        btnLanjutkanDrafting.should('contain', 'Tidak')
            .and('be.visible')
            .click()

        const titleMenu = cy.get(konsep_naskah.titleMenu).as('titleMenu')
        titleMenu.should('contain', 'Konsep Naskah')
            .and('be.visible')

        menuPage.goToKotakMasukReviewNaskah()
    }

    aksesFormKopSurat() {
        const previewKop = cy.get(konsep_naskah.previewKop).as('previewKop')
        previewKop.click(180, 60)

        const titleKop = cy.xpath(konsep_naskah.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
    }

    aksesFormKepalaSurat() {
        const previewKepala = cy.xpath(konsep_naskah.previewKepala).as('previewKepala')
        previewKepala.click(180, 240)

        const titleKepala = cy.get(konsep_naskah.titleKepala).as('titleKepala')
        titleKepala.should('contain', 'Kepala Surat')
    }

    aksesBadanNaskah() {
        const previewBadan = cy.xpath(konsep_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360)

        const titleBadan = cy.get(konsep_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    aksesKakiSurat() {
        const previewKaki = cy.xpath(konsep_naskah.previewKaki).as('previewKaki')
        previewKaki.click(180, 560)

        const titleKaki = cy.xpath(konsep_naskah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    aksesLampiranSurat() {
        const titleLampiran = cy.xpath(konsep_naskah.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Klik tombol berikut untuk menambah lampiran')
    }

    validateFormDefault() {
        const editFormDefault = cy.get(konsep_naskah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')
    }

}