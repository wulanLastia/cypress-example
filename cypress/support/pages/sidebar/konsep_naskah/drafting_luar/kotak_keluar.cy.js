import kotak_keluar from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_keluar"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class KotakKeluarPage {

    goToKotakKeluarTTEReview() {
        // Click Menu Kotak Keluar
        const btn_menuKotakKeluar = cy.get(kotak_keluar.btn_menuKotakKeluar).as('btn_menuKotakKeluar')
        btn_menuKotakKeluar.should('contain', 'Kotak Keluar')
            .click()

        // CLick Menu TTE & Review
        const btn_menuTteReview = cy.get(kotak_keluar.btn_menuTteReview).as('btn_menuTteReview')
        btn_menuTteReview.should('contain', 'TTE & Review')
            .click()
    }

    checkWarnaLabelUrgensi() {
        // Get label existing on data ke 0
        const label_tableDataUrgensi = cy.get(kotak_keluar.label_tableDataUrgensi).as('label_tableDataUrgensi')
        label_tableDataUrgensi.find('p')
            .invoke('text')
            .then((text) => {

                var textUrgensi = text.trim()

                // Assertion warna
                if (textUrgensi == "Amat Segera") {
                    const label_dataUrgensi = cy.get(kotak_keluar.label_tableDataUrgensi).as('label_dataUrgensi')
                    label_dataUrgensi.find('path')
                        .should('have.attr', 'fill', '#F44336')
                } else if (textUrgensi == "Biasa") {
                    const label_dataUrgensi = cy.get(kotak_keluar.label_tableDataUrgensi).as('label_dataUrgensi')
                    label_dataUrgensi.find('path')
                        .should('have.attr', 'fill', '#16A75C')
                } else if (textUrgensi == "Penting") {
                    const label_dataUrgensi = cy.get(kotak_keluar.label_tableDataUrgensi).as('label_dataUrgensi')
                    label_dataUrgensi.find('path')
                        .should('have.attr', 'fill', '#42A5F5')
                } else {
                    const label_dataUrgensi = cy.get(kotak_keluar.label_tableDataUrgensi).as('label_dataUrgensi')
                    label_dataUrgensi.find('path')
                        .should('have.attr', 'fill', '#FFD026')
                }
            })
    }

    checkWarnaLabelStatus() {
        // Get label existing on data ke 0
        const label_tableDataStatus = cy.get(kotak_keluar.label_tableDataStatus).as('label_tableDataStatus')
        label_tableDataStatus.find('p')
            .invoke('text')
            .then((text) => {

                var textStatus = text.replace(/\s|[0-9_]|\W|[#$%^&*()]/g, '')

                // Assertion label
                if (textStatus == "Selesai") {
                    const label_dataStatus = cy.get(kotak_keluar.label_tableDataStatus).as('label_dataStatus')
                    label_dataStatus.find('svg')
                        .should('have.class', 'iconify iconify--material-symbols text-[#008444]')
                } else if (textStatus == "Direview" || textStatus == "Proses TTE") {
                    const label_dataStatus = cy.get(kotak_keluar.label_tableDataStatus).as('label_dataStatus')
                    label_dataStatus.find('svg')
                        .should('have.class', 'iconify iconify--material-symbols text-[#1565C0]')
                } else if (textStatus == "TTE Naskah" || textStatus == "TTE Ulang" || textStatus == "Review Naskah") {
                    const label_dataStatus = cy.get(kotak_keluar.label_tableDataStatus).as('label_dataStatus')
                    label_dataStatus.find('svg')
                        .should('have.class', 'iconify iconify--material-symbols text-white')
                }
            })
    }

    searchDokumen(inputText) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const input_searchKotakKeluar = cy.get(kotak_keluar.input_searchKotakKeluar).as('input_searchKotakKeluar')
        input_searchKotakKeluar.find('input')
            .clear()
            .type(inputText)
            .invoke('val')
            .then((val) => {
                // Check inputan length
                if (val.length >= 3) {
                    cy.wait('@checkResponse', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                if (interception.response.body.data === null) {
                                    const table_emptyState = cy.get(kotak_keluar.table_emptyState).as('table_emptyState')
                                    table_emptyState.find('p').should('contain', 'Hasil pencarian tidak ditemukan')
                                } else {
                                    if (interception.response.body.data.documents.pageInfo.totalCount === 0) {
                                        const table_emptyState = cy.get(kotak_keluar.table_emptyState).as('table_emptyState')
                                        table_emptyState.find('p').should('contain', 'Hasil pencarian tidak ditemukan')
                                    } else {
                                        const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).as('label_tableDataJenis')
                                        label_tableDataJenis.find('p')
                                            .contains(val)
                                    }
                                }
                            }
                        })
                }
            })
    }
}