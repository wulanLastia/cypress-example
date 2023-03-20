import review_naskah from "../../../selectors/sidebar/kotak_masuk/list_review_naskah"


export class ListSuratReviewNaskahPage {

    checkDetailHalaman() {
        this.checkTitleReviewNaskah()

        const filterReviewNaskah = cy.xpath(review_naskah.buttonFilterReviewNaskah).as('filterReviewNaskah')
        filterReviewNaskah.should('contain','Atur Filter')

        const searchReviewNaskah = cy.xpath(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
        searchReviewNaskah.should('have.attr', 'placeholder', 'Cari berdasarkan perihal')

        const tableReviewNaskah = cy.xpath(review_naskah.tableReviewNaskah).as('tableReviewNaskah')
        tableReviewNaskah.should('have.class', 'w-full mx-auto bg-white rounded-lg mb-24')
    }

    checkTitleReviewNaskah(){
        const titleReviewNaskah = cy.xpath(review_naskah.titleReviewNaskah).as('titleReviewNaskah')
        titleReviewNaskah.should('contain','Kotak Masuk')

        const subTitleReviewNaskah = cy.xpath(review_naskah.subTitleReviewNaskah).as('subTitleReviewNaskah')
        subTitleReviewNaskah.should('contain','Review Naskah')
    }

}