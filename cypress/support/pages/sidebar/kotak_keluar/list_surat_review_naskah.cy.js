import review_naskah from "../../../selectors/sidebar/kotak_keluar/list_review_naskah"

export class ListSuratReviewNaskahKeluarPage {

    checkDetailHalaman() {
        this.checkTitleReviewNaskah()

        const buttonFilterReviewNaskahKeluar = cy.get(review_naskah.buttonFilterReviewNaskahKeluar).as('buttonFilterReviewNaskahKeluar')
        buttonFilterReviewNaskahKeluar.should('contain', 'Atur Filter')

        const searchReviewNaskahKeluar = cy.get(review_naskah.searchReviewNaskahKeluar).as('searchReviewNaskahKeluar')
        searchReviewNaskahKeluar.should('have.attr', 'placeholder', 'Cari berdasarkan perihal atau tujuan naskah')

        const tableReviewNaskahKeluar = cy.get(review_naskah.tableReviewNaskahKeluar).as('tableReviewNaskahKeluar')
        tableReviewNaskahKeluar.should('have.class', 'table row-clickable')
    }

    checkTitleReviewNaskah() {
        const titleReviewNaskahKeluar = cy.get(review_naskah.titleReviewNaskahKeluar).as('titleReviewNaskahKeluar')
        titleReviewNaskahKeluar.should('contain', 'Kotak Keluar')

        const subTitleReviewNaskahKeluar = cy.get(review_naskah.subTitleReviewNaskahKeluar).as('subTitleReviewNaskahKeluar')
        subTitleReviewNaskahKeluar.should('contain', 'Review Naskah')
    }

    checkSearchResultsTujuanKotakKeluar(inputanTujuan) {
        const searchReviewNaskahKeluar = cy.get(review_naskah.searchReviewNaskahKeluar).as('searchReviewNaskahKeluar')
        searchReviewNaskahKeluar.click()
            .wait(3000)
            .type(inputanTujuan)
            .wait(3000)

        const resultSearchReviewNaskah = cy.get(review_naskah.dataTujuanRowTable0).as('resultSearchReviewNaskah')
        resultSearchReviewNaskah.should('contain', inputanTujuan)

    }

    checkSearchResultsPerihalKotakKeluar(inputanPerihal) {
        const searchReviewNaskahKeluar = cy.get(review_naskah.searchReviewNaskahKeluar).as('searchReviewNaskahKeluar')
        searchReviewNaskahKeluar.click()
            .wait(3000)
            .clear()
            .wait(3000)
            .type(inputanPerihal)
            .wait(3000)

        const resultSearchReviewNaskah = cy.get(review_naskah.dataPerihalRowTable0).as('resultSearchReviewNaskah')
        resultSearchReviewNaskah.invoke('text').then(text => {
            expect(text).to.include(inputanPerihal);
        });

    }

    checkPreviewPDFSurat() {
        const searchReviewNaskahKeluar = cy.get(review_naskah.searchReviewNaskahKeluar).as('searchReviewNaskahKeluar')
        searchReviewNaskahKeluar.click()
            .wait(3000)
            .clear()
            .wait(3000)

        const btnAturFilter = cy.get(review_naskah.buttonFilterReviewNaskahKeluar).as('btnAturFilter')
        btnAturFilter.click()

        cy.wait(1500)

        const btnStatusFilter = cy.get(review_naskah.buttonFilterStatus).as('btnStatusFilter')
        btnStatusFilter.click()

        cy.wait(1500)

        const checkboxStatusTelahDisetujui = cy.get(review_naskah.checkboxTelahDisetujui).as('checkboxStatusTelahDisetujui')
        checkboxStatusTelahDisetujui.click()

        cy.wait(3000)

        const kotakkeluarDataRow1 = cy.get(review_naskah.dataKotakKeluarRow1).as('kotakkeluarDataRow1')
        kotakkeluarDataRow1.click()

        cy.wait(3000)

        const btnPreviewPDF = cy.get(review_naskah.buttonPreviewPDF).as('btnPreviewPDF')
        btnPreviewPDF.invoke('removeAttr', 'target').click({ force: true })

        cy.wait(6000)

        // Cek URL setelah di klik
        cy.url().should('include', 'https://office-service-v2.staging.digitalservice.id/files/')

        // Cek pada akhiran URL mengandung .pdf
        cy.url().should('match', /.*\.pdf$/)

        cy.wait(3000)

        cy.go('back')
    }

}