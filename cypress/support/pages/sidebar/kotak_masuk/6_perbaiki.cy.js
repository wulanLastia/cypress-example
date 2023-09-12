import review_verifikasi_surat from "../../../selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import perbaiki from "../../../selectors/sidebar/kotak_masuk/perbaiki"
import { CreateSuratBiasaPage } from "../konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { UpdateNotaDinasPage } from "../konsep_naskah/nota_dinas/pgs_update_nota_dinas.cy.js"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const createSuratBiasaPage = new CreateSuratBiasaPage()
const updateNotaDinasPage = new UpdateNotaDinasPage()
const perihalNaskah = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

export class PerbaikiNaskahPage {

    goToNaskahBelumDireview() {
        menuPage.goToKotakMasukReviewNaskah()
        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            const tableReviewSurat = cy.xpath(review_verifikasi_surat.tableReviewSurat).as('tableReviewSurat')
            tableReviewSurat.contains('td', titlePerihalNaskah)
                .click()

            cy.wait(6000)
        })
    }

    batalPerbaikiNaskah() {
        const btnKembali = cy.xpath(perbaiki.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')
            .click()

        const titleKotakMasuk = cy.xpath(perbaiki.titleKotakMasuk).as('titleKotakMasuk')
        titleKotakMasuk.should('contain', 'Kotak Masuk')
            .and('be.visible')
    }

    perbaikiNaskah() {
        const getbtnPerbaiki = cy.get(perbaiki.getbtnPerbaiki).as('getbtnPerbaiki')
        getbtnPerbaiki.should('contain', 'Perbaiki')
            .click()

        cy.wait(6000)

        const getpreviewKepala = cy.get(perbaiki.getpreviewKepala).as('getpreviewKepala')
        getpreviewKepala.click(180, 240, { force: true })

        createSuratBiasaPage.inputPerbaikiKepalaSurat()

        const btnKirimNaskah = cy.xpath(perbaiki.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()

        const popupKonfirmasiKirimNaskah = cy.get(perbaiki.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(perbaiki.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

        perbaikiNaskahNotaDinas() {
        const getbtnPerbaiki = cy.get(perbaiki.getbtnPerbaiki).as('getbtnPerbaiki')
        getbtnPerbaiki.should('contain', 'Perbaiki')
            .click({ force: true })
        cy.debug()

        cy.wait(20000)

        const getpreviewKepala = cy.get(perbaiki.getpreviewKepala).as('getpreviewKepala')
        getpreviewKepala.click(180, 240, { force: true })

        updateNotaDinasPage.inputPerbaikiKepalaSurat()

        cy.wait(6000)

        const btnKirimNaskah = cy.xpath(perbaiki.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()

        cy.wait(3000)

        const popupKonfirmasiKirimNaskah = cy.get(perbaiki.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(perbaiki.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

}