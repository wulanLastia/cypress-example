import kotak_masuk from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class KotakMasukPage {

    goToKotakMasukTTEReview() {
        // Click Menu Kotak Keluar
        const btn_menuKotakMasuk = cy.get(kotak_masuk.btn_menuKotakMasuk).as('btn_menuKotakMasuk')
        btn_menuKotakMasuk.should('contain', 'Kotak Masuk')
            .click()

        // CLick Menu TTE & Review
        const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
        btn_menuTteReview.should('contain', 'TTE & Review')
            .click()
    }

    checkNaskahKotakMasuk() {
        cy.readFile(getPreviewData).then((object) => {
            const perihal = object.identitas_surat[0].perihal

            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

            const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
            input_searchKotakMasuk.find('input')
                .clear()
                .type(perihal)

            cy.wait('@checkResponse', { timeout: 10000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                        table_kotakMasuk.contains('td', perihal)
                            .click()
                    }
                })
        })
    }
}