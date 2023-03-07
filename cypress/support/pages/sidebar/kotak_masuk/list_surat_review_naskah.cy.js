import review_naskah from "../../../selectors/sidebar/kotak_masuk/list_review_naskah"


export class ListSuratReviewNaskahPage {

    checkDetailHalaman() {
        const placeholderSearch = cy.xpath(review_naskah.placeholderSearch)
        
        placeholderSearch.should('contain','Cari naskah...')
            .and('be.visible')
    }

}