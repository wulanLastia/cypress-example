import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import { MenuPage } from "../../menu/menu.cy"

const menuPage = new MenuPage()

export class DraftingKonsepNaskahPage {

    goToKonsepNaskahSuratBiasa() {
        menuPage.goToKonsepNaskah()

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
        cy.wait(6000)

        this.aksesFormKepalaSurat()
        cy.wait(6000)

        this.aksesBadanNaskah()
        cy.wait(6000)

        this.aksesKakiSurat()
        cy.wait(6000)

        this.aksesLampiranSurat()
        cy.wait(6000)
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

        this.checkPreviewNaskah()
    }

    batalDrafting() {
        this.clickbtnKembali()

        const titleBatalDrafting = cy.get(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnBatalDrafting = cy.get(konsep_naskah.btnBatalDrafting).as('btnBatalDrafting')
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

        const titleBatalDrafting = cy.get(konsep_naskah.titleBatalDrafting).as('titleBatalDrafting')
        titleBatalDrafting.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const btnLanjutkanDrafting = cy.get(konsep_naskah.btnLanjutkanDrafting).as('btnLanjutkanDrafting')
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

        const titleKop = cy.get(konsep_naskah.titleKop).as('titleKop')
        titleKop.should('contain', 'Kop Surat')
    }

    aksesFormKepalaSurat() {
        const previewKepala = cy.get(konsep_naskah.previewKepala).as('previewKepala')
        previewKepala.click(180, 240, { force: true })

        const titleKepala = cy.get(konsep_naskah.titleKepala).as('titleKepala')
        titleKepala.should('contain', 'Kepala Surat')
    }

    aksesBadanNaskah() {
        const previewBadan = cy.get(konsep_naskah.previewBadan).as('previewBadan')
        previewBadan.click(180, 360, { force: true })

        const titleBadan = cy.get(konsep_naskah.titleBadan).as('titleBadan')
        titleBadan.should('contain', 'Badan Naskah')
    }

    aksesKakiSurat() {
        const previewKaki = cy.get(konsep_naskah.previewKaki).as('previewKaki')
        previewKaki.click(180, 560, { force: true })

        const titleKaki = cy.get(konsep_naskah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    aksesLampiranSurat() {
        const titlePreviewLampiran = cy.get(konsep_naskah.titlePreviewLampiran).as('titlePreviewLampiran')
        titlePreviewLampiran.should('contain', 'Klik tombol berikut untuk menambah lampiran')

        const subTitlePreviewLampiran = cy.get(konsep_naskah.subTitlePreviewLampiran).as('subTitlePreviewLampiran')
        subTitlePreviewLampiran.should('contain', '(Batas maksimal ukuran berkas unggahan adalah 10 GB dengan file pdf)')

        const btnBuatLampiran = cy.get(konsep_naskah.btnBuatLampiran).as('btnBuatLampiran')
        btnBuatLampiran.should('contain', 'Buat Lampiran')
            .and('be.enabled')

        const btnUploadFile = cy.get(konsep_naskah.btnUploadFile).as('btnUploadFile')
        btnUploadFile.should('contain', 'Upload File')
            .and('be.enabled')

    }

    validateFormDefault() {
        const editFormDefault = cy.get(konsep_naskah.editFormDefault).as('editFormDefault')
        editFormDefault.should('contain', 'Klik bagian surat di samping untuk mengisi dan mengubah isi naskah')
            .and('be.visible')
    }

    inputKakiSurat() {
        const previewKaki = cy.get(konsep_naskah.previewKaki).as('previewKaki')
        previewKaki.click({ multiple: true })

        const titleKaki = cy.get(konsep_naskah.titleKaki).as('titleKaki')
        titleKaki.should('contain', 'Kaki Surat')
    }

    inputLampiranSurat() {
        const previewLampiran = cy.get(konsep_naskah.previewLampiran).as('previewLampiran')
        previewLampiran.click()

        const titleLampiran = cy.get(konsep_naskah.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Lampiran')
    }

    inputLampiranSurat2() {
        const previewLampiran = cy.get(konsep_naskah.previewLampiran).last().as('previewLampiran')
        previewLampiran.click()

        const titleLampiran = cy.get(konsep_naskah.titleLampiran).as('titleLampiran')
        titleLampiran.should('contain', 'Lampiran')
    }

    kirimNaskah() {
        const btnKirimNaskah = cy.get(konsep_naskah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()

        const konfirmasiKirimNaskah = cy.get(konsep_naskah.konfirmasiKirimNaskah).as('konfirmasiKirimNaskah')
        konfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    scrollPreviewPage() {
        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo('top')
    }

    scrollPreviewDownPage() {
        cy.wait(3000)

        const previewPageDown = cy.xpath(konsep_naskah.previewPageDown).as('previewPageDown')
        previewPageDown.scrollTo('bottom')
    }

    clickSimpanSurat() {
        const buttonSimpanSurat = cy.get(konsep_naskah.btnSimpanSurat).as('buttonSimpanSurat')
        buttonSimpanSurat.should('contain', 'Simpan')
            .click()
    }

}