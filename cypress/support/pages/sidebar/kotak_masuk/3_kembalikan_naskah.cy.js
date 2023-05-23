import kembalikan_naskah from "../../../selectors/sidebar/kotak_masuk/kembalikan_naskah"
import { ReviewVerifikasiSuratPage } from "./2_review_verifikasi_surat.cy"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()

export class KembalikanNaskahPage {

    goToNaskahBelumDireview() {
        menuPage.goToKotakMasukReviewNaskah()
        reviewVerifikasiSuratPage.suratBelumDireview()
    }

    emptyField() {
        this.goToNaskahBelumDireview()

        const btnKembalikan = cy.xpath(kembalikan_naskah.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('be.visible')
            .click()

        const popUpKembalikanNaskah = cy.xpath(kembalikan_naskah.popUpKembalikanNaskah).as('popUpKembalikanNaskah')
        popUpKembalikanNaskah.should('be.visible')

        const titleKembalikanNaskah = cy.xpath(kembalikan_naskah.titleKembalikanNaskah).as('titleKembalikanNaskah')
        titleKembalikanNaskah.should('contain', 'Tandai poin-poin perbaikan')

        const btnKembalikanNaskah = cy.xpath(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .and('have.attr', 'disabled', 'disabled')
    }

    popUpKembalikanNaskah() {
        const popUpKembalikanNaskah = cy.xpath(kembalikan_naskah.popUpKembalikanNaskah).as('popUpKembalikanNaskah')
        popUpKembalikanNaskah.should('be.visible')

        const titleKembalikanNaskah = cy.xpath(kembalikan_naskah.titleKembalikanNaskah).as('titleKembalikanNaskah')
        titleKembalikanNaskah.should('contain', 'Tandai poin-poin perbaikan')
    }

    checkHalamanInformasi() {
        cy.wait(3000)

        const btnKembalikan = cy.xpath(kembalikan_naskah.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('be.visible')
            .click()

        this.popUpKembalikanNaskah()
    }

    batalKembalikanNaskah() {
        const btnBatalKembalikanNaskah = cy.xpath(kembalikan_naskah.btnBatalKembalikanNaskah).as('btnBatalKembalikanNaskah')
        btnBatalKembalikanNaskah.should('contain', 'Batal')
            .click()
    }

    popUpKonfirmasiKembalikanNaskah() {
        const popUpKonfirmasiKembalikanNaskah = cy.xpath(kembalikan_naskah.popUpKonfirmasiKembalikanNaskah).as('popUpKonfirmasiKembalikanNaskah')
        popUpKonfirmasiKembalikanNaskah.should('be.visible')

        const titleKonfirmasiKembalikanNaskah = cy.xpath(kembalikan_naskah.titleKonfirmasiKembalikanNaskah).as('titleKonfirmasiKembalikanNaskah')
        titleKonfirmasiKembalikanNaskah.should('contain', 'Pastikan anda sudah melengkapi catatan perbaikan sebelum mengirimkan naskah kepada konseptor')

        const subTitleKonfirmasiKembalikanNaskah = cy.xpath(kembalikan_naskah.subTitleKonfirmasiKembalikanNaskah).as('subTitleKonfirmasiKembalikanNaskah')
        subTitleKonfirmasiKembalikanNaskah.should('contain', 'Naskah ini akan diteruskan ke pihak berikut untuk dilakukan Perbaikan')
    }

    checkBtnPeriksaKembali() {
        this.inputPerihal()

        const btnKembalikanNaskah = cy.xpath(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .click()

        this.popUpKonfirmasiKembalikanNaskah()

        const btnPeriksaKembali = cy.xpath(kembalikan_naskah.btnPeriksaKembali).as('btnPeriksaKembali')
        btnPeriksaKembali.should('contain', 'Periksa kembali')
            .click()

        this.popUpKembalikanNaskah()
    }

    inputSifatNaskah() {
        const checkSifatNaskah = cy.xpath(kembalikan_naskah.checkSifatNaskah).as('checkSifatNaskah')
        checkSifatNaskah.check()

        const inputSifatNaskah = cy.xpath(kembalikan_naskah.inputSifatNaskah).as('inputSifatNaskah')
        inputSifatNaskah.type('Perbaiki Sifat Naskah')
    }

    inputTembusan() {
        const checkTembusan = cy.xpath(kembalikan_naskah.checkTembusan).as('checkTembusan')
        checkTembusan.check()

        const inputTembusan = cy.xpath(kembalikan_naskah.inputTembusan).as('inputTembusan')
        inputTembusan.type('Tambahkan tembusan kepada kepala dinas terkait')
    }

    inputPerihal() {
        const checkPerihal = cy.xpath(kembalikan_naskah.checkPerihal).as('checkPerihal')
        checkPerihal.check()

        const inputPerihal = cy.xpath(kembalikan_naskah.inputPerihal).as('inputPerihal')
        inputPerihal.type('Perbaiki perihal surat')
    }

    kembalikanNaskah() {
        this.inputSifatNaskah()

        this.inputTembusan()

        const btnKembalikanNaskah = cy.xpath(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .click()

        this.popUpKonfirmasiKembalikanNaskah()

        Cypress.Cookies.debug(true, { verbose: false })

        const btnKirimNaskah = cy.xpath(kembalikan_naskah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

}