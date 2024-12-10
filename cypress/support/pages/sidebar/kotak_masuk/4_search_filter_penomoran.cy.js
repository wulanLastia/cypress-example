import search_filter from "@selectors/sidebar/kotak_masuk/search_filter_penomoran"
import { ReviewVerifikasiSuratPage } from "./2_review_verifikasi_surat.cy"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const reviewVerifikasiSuratPage = new ReviewVerifikasiSuratPage()

export class FilterDanSearchPenomoranPage {

    searchDokumen(inputText) {
        const search = cy.xpath(search_filter.search).as('search')
        search.clear()
        search.type(inputText)
            .then((inputText) => {
                if (inputText.length > 2) {
                    const tablePenomoran = cy.xpath(search_filter.tablePenomoran).as('tablePenomoran')
                    tablePenomoran.contains('td', 'Dinomori')
                }
            })
    }

    suratBelumDinomori() {
        const tablePenomoran = cy.xpath(search_filter.tablePenomoran).as('tableReviewSurat')
        tablePenomoran.contains('td', 'BELUM DINOMORI')
            .click()
    }

    nomoriDanTeruskan() {
        const btnNomori = cy.xpath(search_filter.btnNomori).as('btnNomori')
        btnNomori.should('contain', 'Nomori dan teruskan ke penandatangan')
            .click()

        const popUpPenomoran = cy.xpath(search_filter.popUpPenomoran).as('popUpPenomoran')
        popUpPenomoran.should('be.visible')

        const titlePenomoran = cy.xpath(search_filter.titlePenomoran).as('titlePenomoran')
        titlePenomoran.should('contain', 'Penomoran Naskah')

        const subTitlePenomoran = cy.xpath(search_filter.subTitlePenomoran).as('subTitlePenomoran')
        subTitlePenomoran.should('contain', 'Masukkan nomor naskah pada form berikut')

        const inputNomor = cy.xpath(search_filter.inputNomor).as('inputNomor')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const nomorAutomate = `${id}`
        inputNomor.type(nomorAutomate)

        const btnPeriksa = cy.xpath(search_filter.btnPeriksa).as('btnPeriksa')
        btnPeriksa.should('contain', 'Periksa')
            .click()
            .then((val) => {
                const checkedPeriksaNomor = cy.xpath(search_filter.checkedPeriksaNomor).as('checkedPeriksaNomor')
                checkedPeriksaNomor.should('be.visible')
            })

        const btnSimpanPenomoran = cy.xpath(search_filter.btnSimpanPenomoran).as('btnSimpanPenomoran')
        btnSimpanPenomoran.should('contain', 'Simpan penomoran')
            .click()

        const popUpKonfirmasi = cy.xpath(search_filter.popUpKonfirmasi).as('popUpKonfirmasi')
        popUpKonfirmasi.should('be.visible')

        const titleKonfirmasi = cy.xpath(search_filter.titleKonfirmasi).as('titleKonfirmasi')
        titleKonfirmasi.should('contain', 'Apakah nomor naskah berikut telah sesuai?')

        const subTitleKonfirmasi = cy.xpath(search_filter.subTitleKonfirmasi).as('subTitleKonfirmasi')
        subTitleKonfirmasi.should('contain', 'Pastikan bahwa nomor naskah sudah benar dan klik tombol “Ya, sesuai” untuk mengunci nomor dan meneruskan naskah kepada penandatangan.')

        const btnKonfirmasi = cy.xpath(search_filter.btnKonfirmasi).as('btnKonfirmasi')
        btnKonfirmasi.should('contain', 'Ya, sesuai')
            .click()
    }

}