import review_naskah from "../../../selectors/sidebar/kotak_masuk/list_review_naskah"

export class ListSuratReviewNaskahPage {

    checkDetailHalaman() {
        this.checkTitleReviewNaskah()

        const filterReviewNaskah = cy.get(review_naskah.buttonFilterReviewNaskah).as('filterReviewNaskah')
        filterReviewNaskah.should('contain', 'Atur Filter')
            .and('be.visible')

        const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
        searchReviewNaskah.find('input')
            .should('have.attr', 'placeholder', 'Cari berdasarkan perihal atau tujuan naskah')
            .and('be.visible')

        const tableReviewNaskah = cy.get(review_naskah.tableReviewNaskah).as('tableReviewNaskah')
        tableReviewNaskah.should('have.class', 'w-full mx-auto bg-white rounded-lg mb-24')
            .and('be.visible')
    }

    checkTitleReviewNaskah() {
        const titleReviewNaskah = cy.get(review_naskah.titleReviewNaskah).as('titleReviewNaskah')
        titleReviewNaskah.should('contain', 'Kotak Masuk')
            .and('be.visible')

        const subTitleReviewNaskah = cy.get(review_naskah.subTitleReviewNaskah).as('subTitleReviewNaskah')
        subTitleReviewNaskah.should('contain', 'Review Naskah')
            .and('be.visible')
    }

    checkPreviousPage() {
        const btnPreviousPage = cy.get(review_naskah.btnPreviousPage).as('btnPreviousPage')
        btnPreviousPage.should('be.disabled')
    }

    searchDokumen(inputText) {
        const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
        searchReviewNaskah.find('input').clear()
        searchReviewNaskah.type(inputText)
            .then((inputText) => {

                if (inputText.length > 2) {
                    const tableEmptyState = cy.get(review_naskah.tableEmptyState).as('tableEmptyState')
                    tableEmptyState.then($tr => {
                        if ($tr.is(':visible')) {
                            closePopup.click()
                        } else {
                            const tableReviewNaskah = cy.get(review_naskah.tableReviewNaskah).as('tableReviewNaskah')
                            tableReviewNaskah.contains('td', inputText)
                        }
                    })
                } else {
                    const tableDataPerihal = cy.get(review_naskah.tableDataPerihal).as('tableDataPerihal')
                    tableDataPerihal.should('not.equal', inputText)
                }
            })
    }
}