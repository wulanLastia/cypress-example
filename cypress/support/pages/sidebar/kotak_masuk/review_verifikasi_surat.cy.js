import review_verifikasi from "../../../selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import { ListSuratReviewNaskahPage } from "../kotak_masuk/list_surat_review_naskah.cy"

const listSuratReviewNaskahPage = new ListSuratReviewNaskahPage()

export class ReviewVerifikasiSuratPage {

    suratBelumDireview() {
        const tableReviewSurat = cy.xpath(review_verifikasi.tableReviewSurat).as('tableReviewSurat')
        tableReviewSurat.contains('td', 'BELUM DIREVIEW')
            .click()

        this.checkDetailSurat()
    }

    checkDetailSurat() {
        const btnKembali = cy.xpath(review_verifikasi.btnKembali).as('btnKembali')
        btnKembali.should('have.class', '-mt-1.5 cursor-pointer -ml-4')
            .and('be.visible')

        const titleSurat = cy.xpath(review_verifikasi.titleSurat).as('titleSurat')
        titleSurat.should('contain', 'Review Naskah')
            .and('be.visible')

        const jenisNaskah = cy.xpath(review_verifikasi.jenisNaskah).as('jenisNaskah')
        jenisNaskah.should('contain', 'Surat Biasa')
            .and('be.visible')

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

        /*const btnKembalikan = cy.xpath(review_verifikasi.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('contain', 'Kembalikan')
            .and('be.visible')

        const btnKoreksi = cy.xpath(review_verifikasi.btnKoreksi).as('btnKoreksi')
        btnKoreksi.should('contain', 'Koreksi')
            .and('be.visible')*/

        const btnSetujui = cy.xpath(review_verifikasi.btnSetujui).as('btnSetujui')
        btnSetujui.should('have.class', 'gap-2 cursor-pointer font-source hover:bg-blue-100 rounded-lg mb-2.5 whitespace-nowrap base-button base-button--primary')
            .and('be.visible')

        const previewSurat = cy.xpath(review_verifikasi.previewSurat).as('previewSurat')
        previewSurat.should('not.to.be.empty')

        const btnHistory = cy.xpath(review_verifikasi.btnHistory).as('btnHistory')
        btnHistory.should('contain', 'Segera lakukan aksi untuk naskah ini')
            .and('be.visible')
    }

    lanjutkanReviewDrafting() {
        const btnKembali = cy.xpath(review_verifikasi.btnKembali).as('btnKembali')
        btnKembali.should('have.class', '-mt-1.5 cursor-pointer -ml-4')
            .click()

        listSuratReviewNaskahPage.checkTitleReviewNaskah()
    }
}