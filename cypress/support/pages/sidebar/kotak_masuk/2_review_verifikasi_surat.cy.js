import review_verifikasi from "../../../selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import { ListSuratReviewNaskahPage } from "../kotak_masuk/1_list_surat_review_naskah.cy"

const listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()
const perihalNaskah = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

export class ReviewVerifikasiSuratPage {

    suratBelumDireview() {
        cy.wait(6000)

        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            const tableReviewSurat = cy.xpath(review_verifikasi.tableReviewSurat).as('tableReviewSurat')
            tableReviewSurat.contains('td', titlePerihalNaskah)
                .click()
        })

        this.checkDetailSurat()
    }

    checkDetailSurat() {
        cy.wait(3000)

        const btnKembali = cy.xpath(review_verifikasi.btnKembali).as('btnKembali')
        btnKembali.should('have.class', 'flex')
            .and('be.visible')

        const titleSurat = cy.xpath(review_verifikasi.titleSurat).as('titleSurat')
        titleSurat.should('contain', 'Review Naskah')
            .and('be.visible')

        const jenisNaskah = cy.xpath(review_verifikasi.jenisNaskah).as('jenisNaskah')
        jenisNaskah.should('be.visible')

        const labelUrgensi = cy.xpath(review_verifikasi.labelUrgensi).as('labelUrgensi')
        labelUrgensi.then(($urg) => {
            if ($urg.attr('style').includes('background-color: rgb(244, 67, 54)')) {
                const textUrgensi = cy.xpath(review_verifikasi.textUrgensi).as('textUrgensi')
                textUrgensi.should('contain', 'Amat Segera')
                    .and('be.visible')
            } else if ($urg.attr('style').includes('background-color: rgb(255, 208, 38)')) {
                const textUrgensi = cy.xpath(review_verifikasi.textUrgensi).as('textUrgensi')
                textUrgensi.should('contain', 'Segera')
                    .and('be.visible')
            } else if ($urg.attr('style').includes('background-color: rgb(22, 167, 92)')) {
                const textUrgensi = cy.xpath(review_verifikasi.textUrgensi).as('textUrgensi')
                textUrgensi.should('contain', 'Biasa')
                    .and('be.visible')
            } else {
                const textUrgensi = cy.xpath(review_verifikasi.textUrgensi).as('textUrgensi')
                textUrgensi.should('contain', 'Penting')
                    .and('be.visible')
            }
        })

        const getbtnKembalikan = cy.get(review_verifikasi.getbtnKembalikan).as('getbtnKembalikan')
        getbtnKembalikan.should('contain', 'Kembalikan')
            .and('be.visible')

        const getbtnKoreksi = cy.get(review_verifikasi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .and('be.visible')

        const previewSurat = cy.xpath(review_verifikasi.previewSurat).as('previewSurat')
        previewSurat.should('not.to.be.empty')

        const btnHistory = cy.xpath(review_verifikasi.btnHistory).as('btnHistory')
        btnHistory.should('contain', 'Segera lakukan aksi untuk naskah ini')
            .and('be.visible')
    }

    lanjutkanReviewDrafting() {
        const btnKembali = cy.xpath(review_verifikasi.btnKembali).as('btnKembali')
        btnKembali.should('have.class', 'flex')
            .and('be.visible')
            .click()

        cy.wait(3000)

        listSuratReviewNaskahPage.checkTitleReviewNaskah()
    }

    suratBelumDitandatangani() {
        cy.wait(6000)

        const tableReviewSurat = cy.xpath(review_verifikasi.tableReviewSurat).as('tableReviewSurat')
        tableReviewSurat.contains('td', 'BELUM DITANDATANGANI')
            .click()
    }
}