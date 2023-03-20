import review_naskah from "../../../selectors/sidebar/kotak_keluar/list_review_naskah"

export class ListSuratReviewNaskahKeluarPage {

    checkDetailHalaman() {
        this.checkTitleReviewNaskah()

        const buttonFilterReviewNaskahKeluar = cy.xpath(review_naskah.buttonFilterReviewNaskahKeluar).as('buttonFilterReviewNaskahKeluar')
        buttonFilterReviewNaskahKeluar.should('contain','Atur Filter')

        const searchReviewNaskahKeluar = cy.xpath(review_naskah.searchReviewNaskahKeluar).as('searchReviewNaskahKeluar')
        searchReviewNaskahKeluar.should('have.attr', 'placeholder', 'Cari berdasarkan perihal')

        const tableReviewNaskahKeluar = cy.xpath(review_naskah.tableReviewNaskahKeluar).as('tableReviewNaskahKeluar')
        tableReviewNaskahKeluar.should('have.class', 'table row-clickable')
    }

    checkTitleReviewNaskah(){
        const titleReviewNaskahKeluar = cy.xpath(review_naskah.titleReviewNaskahKeluar).as('titleReviewNaskahKeluar')
        titleReviewNaskahKeluar.should('contain','Kotak Keluar')

        const subTitleReviewNaskahKeluar = cy.xpath(review_naskah.subTitleReviewNaskahKeluar).as('subTitleReviewNaskahKeluar')
        subTitleReviewNaskahKeluar.should('contain','Review Naskah')
    }

}