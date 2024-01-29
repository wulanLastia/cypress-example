import setujui from "../../../selectors/sidebar/kotak_masuk/setujui"
import koreksi from "../../../selectors/sidebar/kotak_masuk/koreksi"
import review_naskah from "../../../selectors/sidebar/kotak_masuk/list_review_naskah"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

const perihalNaskah = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"
export class SetujuiPage {

    suratBelumDireview(inputEnv) {
        cy.overrideFeatureToggle({
            'SIDEBAR-ESIGN-SERVICE': false
        })

        menuPage.goToKotakMasukReviewNaskah()
        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            if (inputEnv === 'prod') {
                const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
                searchReviewNaskah.find('input').clear()
                searchReviewNaskah.type(titlePerihalNaskah)

                cy.wait(10000)

                const tableReviewSurat = cy.get(setujui.tableReviewSurat).as('tableReviewSurat')
                tableReviewSurat.contains('td', titlePerihalNaskah)
                    .click()

                cy.wait(6000)
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
                searchReviewNaskah.find('input').clear()
                searchReviewNaskah.type(titlePerihalNaskah)

                cy.wait('@checkResponse', { timeout: 10000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const tableReviewSurat = cy.get(setujui.tableReviewSurat).as('tableReviewSurat')
                            tableReviewSurat.contains('td', titlePerihalNaskah)
                                .click()

                            cy.wait(6000)
                        }
                    })
            }
        })
    }

    setujui() {
        const btnSetujui = cy.get(setujui.btnSetujui).as('btnSetujui')
        btnSetujui.should('contain', 'Setujui')
            .click()

        const popUpSetujui = cy.get(setujui.popUpSetujui).as('popUpSetujui')
        popUpSetujui.should('be.visible')

        const titleSetujui = cy.get(setujui.titleSetujui).as('titleSetujui')
        titleSetujui.should('contain', 'Pastikan naskah Anda sudah benar sebelum meneruskan ke pihak selanjutnya')

        const btnKirimNaskah = cy.get(setujui.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    doTandaTanganiSurat(passphrase) {
        cy.wait(10000)
        const TandaTanganiNaskah = cy.get(koreksi.btnTandaTanganiDraftSurat).as('TandaTanganiNaskah')
        TandaTanganiNaskah.click({ force: true })
        cy.wait(3000)

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')
        cy.wait(3000)

        const inputPassphrase = cy.get(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.get(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }
}