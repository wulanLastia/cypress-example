import setujui from "../../../selectors/sidebar/kotak_masuk/setujui"
import koreksi from "../../../selectors/sidebar/kotak_masuk/koreksi"
import review_naskah from "../../../selectors/sidebar/kotak_masuk/list_review_naskah"
import kotak_masuk from "../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()

const perihalNaskah = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"
export class SetujuiPage {

    suratBelumDireview(inputEnv) {
        // Check layout lama atau baru
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.btn_menuTteReview).css('display') !== 'none') {
                // Click Menu Submenu TTE & Review
                const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
                btn_menuTteReview.should('contain', 'TTE & Review')
                    .click()

                cy.readFile(perihalNaskah).then((object) => {
                    const titlePerihalNaskah = object.titlePerihal
                    
                    // Check drafting dalam or drafting luar
                    if(titlePerihalNaskah.toLowerCase().includes('skp')){
                        // Naskah drafting luar
                        cy.wait(3000)
            
                        // Check onboarding
                        cy.get('body').then($body => {
                            if ($body.find(kotak_masuk.dialog_onboarding).length > 0) {
                                // Skip onboarding
                                const dialog_onboardingSkip = cy.get(kotak_masuk.dialog_onboardingSkip).as('dialog_onboardingSkip')
                                dialog_onboardingSkip.click()
            
                                cy.reload()
                            }
                        })
            
                        if(inputEnv == "staging"){
                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')
            
                            const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                            input_searchKotakMasuk.find('input')
                                .clear()
                                .type(titlePerihalNaskah)
            
                            cy.wait('@checkResponse', { timeout: 10000 })
                                .then((interception) => {
                                    if (interception.response.statusCode === 200) {
                                        const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                                        table_kotakMasuk.contains('td', titlePerihalNaskah)
                                            .click()
                                    }
                                })
                        }else{
                            const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                            input_searchKotakMasuk.find('input')
                                .clear()
                                .type(titlePerihalNaskah)
            
                            // Wait until document found
                            cy.wait(10000)
            
                            const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                            table_kotakMasuk.contains('td', titlePerihalNaskah)
                                .click()
                        }  
                    }else{
                        // Naskah drafting dalam
                        // Click tab review naskah
                        const tab_kotakMasukReviewNaskah = cy.get(kotak_masuk.tab_kotakMasukReviewNaskah).as('tab_kotakMasukReviewNaskah')
                        tab_kotakMasukReviewNaskah.should('contain', 'Review Naskah')
                            .click()
                            .wait(6000)

                        if(inputEnv == "staging"){
                            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')
            
                            const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                            input_searchKotakMasuk.find('input')
                                .clear()
                                .type(titlePerihalNaskah)
            
                            cy.wait('@checkResponse', { timeout: 10000 })
                                .then((interception) => {
                                    if (interception.response.statusCode === 200) {
                                        const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                                        table_kotakMasuk.contains('td', titlePerihalNaskah)
                                            .click()
                                    }
                                })
                        }else{
                            const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                            input_searchKotakMasuk.find('input')
                                .clear()
                                .type(titlePerihalNaskah)
            
                            // Wait until document found
                            cy.wait(10000)
            
                            const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                            table_kotakMasuk.contains('td', titlePerihalNaskah)
                                .click()
                        }
                    }
                })
            }else {
                // Go To Menu Kotak Masuk Layout Lama
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

    suratBelumDitandatangani() {
        // Click Menu Submenu TTE & Review
        const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
        btn_menuTteReview.should('contain', 'TTE & Review')
            .click()
            .wait(3000)

        // Search document
        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
            input_searchKotakMasuk.find('input')
                .clear()
                .type(titlePerihalNaskah)

            // Wait until document found
            cy.wait(10000)

            const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
            table_kotakMasuk.contains('td', titlePerihalNaskah)
                .click()
        })
    }
}