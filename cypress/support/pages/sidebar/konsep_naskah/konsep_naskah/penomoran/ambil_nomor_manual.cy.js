import ambil_nomor from "../../../../../selectors/sidebar/konsep_naskah/penomoran/ambil_nomor_manual"
import kepala_surat from "../../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kepala_surat"
import { DraftingKonsepNaskahPage } from "../../surat_biasa/pgs_drafting_surat_biasa.cy"
import { DraftingKakiSuratPage } from "../../konsep_naskah/pgs_drafting_kaki_surat.cy"
import ambil_nomor_manual from "../../../../../selectors/sidebar/konsep_naskah/penomoran/ambil_nomor_manual"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()
const draftingKakiSuratPage = new DraftingKakiSuratPage()

export class AmbilNomorManualPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingKakiSurat() {
        draftingKonsepNaskahPage.aksesKakiSurat()
        draftingKakiSuratPage.pilihPenandatanganAtasan()
    }

    aksesFormEditingKepalaSurat() {
        draftingKonsepNaskahPage.aksesFormKepalaSurat()
    }

    checkPopUpPenomoranManual() {
        const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
        titleTanggal.should('contain', 'Tanggal Penomoran')

        const inputTanggal = cy.get(kepala_surat.inputTanggal).as('inputTanggal')
        inputTanggal.click()

        const popupKonfirmasi = cy.get(ambil_nomor.popupKonfirmasi).as('popupKonfirmasi')
        popupKonfirmasi.should('be.visible')

        const titlePopup = cy.get(ambil_nomor.titlePopup).as('titlePopup')
        titlePopup.should('contain', 'Penomoran Manual')

        const popupDesc = cy.get(ambil_nomor.popupDesc).as('popupDesc')
        popupDesc.should('contain', 'Ingat, penomoran manual hanya digunakan untuk kasus khusus. Apakah Anda telah mendiskusikan dengan atasan dan yakin akan melanjutkan?')

        const btnKonfirmasi = cy.xpath(ambil_nomor.btnKonfirmasi).as('btnKonfirmasi')
        btnKonfirmasi.should('contain', 'Ya, lanjutkan')
            .and('be.visible')

        const btnBatal = cy.xpath(ambil_nomor.btnBatal).as('btnBatal')
        btnBatal.should('contain', 'Batal & kembali')
            .and('be.visible')
    }

    checkDetail() {
        const btnKonfirmasi = cy.xpath(ambil_nomor.btnKonfirmasi).as('btnKonfirmasi')
        btnKonfirmasi.should('contain', 'Ya, lanjutkan')
            .and('be.visible')
            .click()

        const titleSelect = cy.get(ambil_nomor.titleSelect).as('titleSelect')
        titleSelect.should('contain', 'Pilih Tanggal Penomoran Manual')

        const selectDesc = cy.get(ambil_nomor.selectDesc).as('selectDesc')
        selectDesc.should('contain', 'Slot penomoran manual hanya tersedia 10 hari dari tanggal pembuatan surat. Klik “pesan” untuk mendapatkan nomor.')

        const kolom1 = cy.xpath(ambil_nomor.kolom1).as('kolom1')
        kolom1.should('contain', 'HARI & TANGGAL')

        const kolom2 = cy.xpath(ambil_nomor.kolom2).as('kolom2')
        kolom2.should('contain', 'TERSEDIA')

        const kolom3 = cy.xpath(ambil_nomor.kolom3).as('kolom3')
        kolom3.should('contain', 'PEMESAN')

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

    // PROD
    prodCheckPreviewDinas() {
        const checkRadio2 = cy.get(kop_surat.checkRadio2).as('checkRadio2')
        checkRadio2.click()

        const previewSelectedKop = cy.get(kop_surat.previewSelectedKop).as('previewSelectedKop')
        previewSelectedKop.find('img')
            //.should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/38a80733a1c6437c596c4568e1d263d4.PNG')
            .should('have.attr', 'src', 'https://sidebar.jabarprov.go.id/FilesUploaded/kop/659b50e7a894063e5d4f2699ee0bd788.png')
    }

}