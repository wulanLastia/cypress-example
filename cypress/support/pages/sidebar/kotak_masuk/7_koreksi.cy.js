import review_verifikasi_surat from "../../../selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import koreksi from "../../../selectors/sidebar/kotak_masuk/koreksi"
import { DraftingKonsepNaskahPage } from "../konsep_naskah/surat_biasa/pgs_drafting_surat_biasa.cy"
import { CreateSuratBiasaPage } from "../konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { MenuPage } from "../menu/menu.cy"
import { UpdateNotaDinasPage } from "../konsep_naskah/nota_dinas/pgs_update_nota_dinas.cy.js"

const menuPage = new MenuPage()
const draftingSuratBiasaPage = new DraftingKonsepNaskahPage()
const createSuratBiasaPage = new CreateSuratBiasaPage()
const updateNotaDinasPage = new UpdateNotaDinasPage()

const perihalNaskah = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"

export class KoreksiSuratPage {

    goToNaskahBelumDireview() {
        menuPage.goToKotakMasukReviewNaskah()
        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            const tableReviewSurat = cy.get(review_verifikasi_surat.tableReviewSurat).as('tableReviewSurat')
            tableReviewSurat.contains('td', titlePerihalNaskah, { timeout: 10000 })
                .click()
                .then((data) => {
                    const bsreErrorSign = cy.get(review_verifikasi_surat.bsreErrorSign).as('bsreErrorSign')
                    bsreErrorSign.then($popup => {
                        if ($popup.is(':visible')) {
                            const btnLanjutkanReviewNaskah = cy.xpath(review_verifikasi_surat.btnLanjutkanReviewNaskah).as('btnLanjutkanReviewNaskah')
                            btnLanjutkanReviewNaskah.should('contain', 'Ya, lanjut ke aksi selain TTE')
                                .click()
                        }
                    })
                })
        })
    }

    checkDetailKoreksiTandatangani() {
        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click()

        cy.wait(3000)

        const btnKembaliKoreksi = cy.get(koreksi.btnKembaliKoreksi).as('btnKembaliKoreksi')
        btnKembaliKoreksi.should('be.visible')

        const titleDetailKoreksi = cy.get(koreksi.titleDetailKoreksi).as('titleDetailKoreksi')
        titleDetailKoreksi.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.should('contain', 'Tandatangani')
            .and('be.visible')

        const previewNaskah = cy.get(koreksi.previewNaskah).as('previewNaskah')
        previewNaskah.should('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    checkDetailKoreksiTandatanganiNotaDinas() {
        cy.wait(5000)

        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click({ force: true })
            .wait(8000)

        cy.wait(3000)

        const btnKembaliKoreksi = cy.get(koreksi.btnKembaliKoreksi).as('btnKembaliKoreksi')
        btnKembaliKoreksi.should('be.visible')

        const titleDetailKoreksi = cy.get(koreksi.titleDetailKoreksi).as('titleDetailKoreksi')
        titleDetailKoreksi.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.should('contain', 'Tandatangani')
            .and('be.visible')

        const previewNaskahNotaDinas = cy.get(koreksi.previewNaskahNotaDinas).as('previewNaskahNotaDinas')
        previewNaskahNotaDinas.should('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    checkDetail() {
        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click()

        cy.wait(3000)

        const btnKembali = cy.get(koreksi.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleKoreksi = cy.get(koreksi.titleKoreksi).as('titleKoreksi')
        titleKoreksi.should('contain', 'Review Naskah')
            .and('be.visible')

        const btnKirimNaskah = cy.get(koreksi.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim Naskah')
            .and('be.visible')

        const previewNaskah = cy.get(koreksi.previewNaskah).as('previewNaskah')
        previewNaskah.should('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    koreksiTandatanganiNaskah(passphrase, inputanKoreksi) {
        createSuratBiasaPage.inputKoreksiKepalaSurat(inputanKoreksi)

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.click()

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')

        const inputPassphrase = cy.get(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.get(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }

    koreksiTandatanganiNaskahNotaDinas(passphrase) {
        updateNotaDinasPage.inputKoreksiKepalaSurat()

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.click()

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')

        const inputPassphrase = cy.get(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.get(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }


    koreksiNaskah() {
        createSuratBiasaPage.inputKoreksiKepalaSurat()

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.click()

        const popupKonfirmasiKirimNaskah = cy.get(koreksi.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(koreksi.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

}