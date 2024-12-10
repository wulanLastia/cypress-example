import kembalikan_naskah from "@selectors/sidebar/kotak_masuk/kembalikan_naskah"
import review_verifikasi_surat from "@selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import review_naskah from "@selectors/sidebar/kotak_masuk/list_review_naskah"
import kotak_masuk from "@selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const perihalNaskah = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"
export class KembalikanNaskahPage {

    goToNaskahBelumDireview(inputEnv) {
        // Check layout lama atau baru
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.btn_menuTteReview).css('display') !== 'none') {
                // Click Menu Submenu TTE & Review
                const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
                btn_menuTteReview.should('contain', 'TTE & Review')
                    .click()
                    .wait(9000)

                cy.readFile(perihalNaskah).then((object) => {
                    const titlePerihalNaskah = object.titlePerihal
                    
                    // Ditutup sementara, karena ada perubahan list
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
                                        const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
                                        label_tableDataJenis.should('contain', titlePerihalNaskah)
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
            
                            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
                            label_tableDataJenis.should('contain', titlePerihalNaskah)
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
                                        const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
                                        label_tableDataJenis.should('contain', titlePerihalNaskah)
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
            
                            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
                            label_tableDataJenis.should('contain', titlePerihalNaskah)
                                .click()
                        }
                    }
                })
            } else {
                // Go To Menu Kotak Masuk Layout Lama
                menuPage.goToKotakMasukReviewNaskah()

                cy.readFile(perihalNaskah).then((object) => {
                    const titlePerihalNaskah = object.titlePerihal
        
                    if (inputEnv === 'prod') {
                        const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
                        searchReviewNaskah.find('input').clear()
                        searchReviewNaskah.type(titlePerihalNaskah)
        
                        cy.wait(10000)
        
                        const tableReviewSurat = cy.get(review_verifikasi_surat.tableReviewSurat).as('tableReviewSurat')
                        tableReviewSurat.contains('td', titlePerihalNaskah)
                            .click()
                    } else {
                        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')
        
                        const searchReviewNaskah = cy.get(review_naskah.searchReviewNaskah).as('searchReviewNaskah')
                        searchReviewNaskah.find('input').clear()
                        searchReviewNaskah.type(titlePerihalNaskah)
        
                        cy.wait('@checkResponse', { timeout: 10000 })
                            .then((interception) => {
                                if (interception.response.statusCode === 200) {
                                    const tableReviewSurat = cy.get(review_verifikasi_surat.tableReviewSurat).as('tableReviewSurat')
                                    tableReviewSurat.contains('td', titlePerihalNaskah)
                                        .click()
                                }
                            })
                    }
        
                    cy.wait(9000)
                })
            }
        })
    }

    emptyField() {
        const btnKembalikan = cy.get(kembalikan_naskah.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('be.visible')
            .click()

        const popUpKembalikanNaskah = cy.get(kembalikan_naskah.popUpKembalikanNaskah).as('popUpKembalikanNaskah')
        popUpKembalikanNaskah.should('be.visible')

        const titleKembalikanNaskah = cy.get(kembalikan_naskah.titleKembalikanNaskah).as('titleKembalikanNaskah')
        titleKembalikanNaskah.should('contain', 'Tandai poin-poin perbaikan')

        const btnKembalikanNaskah = cy.get(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .and('have.attr', 'disabled', 'disabled')
    }

    popUpKembalikanNaskah() {
        const popUpKembalikanNaskah = cy.get(kembalikan_naskah.popUpKembalikanNaskah).as('popUpKembalikanNaskah')
        popUpKembalikanNaskah.should('be.visible')

        const titleKembalikanNaskah = cy.get(kembalikan_naskah.titleKembalikanNaskah).as('titleKembalikanNaskah')
        titleKembalikanNaskah.should('contain', 'Tandai poin-poin perbaikan')
    }

    checkHalamanInformasi() {
        cy.wait(3000)

        const btnKembalikan = cy.get(kembalikan_naskah.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('be.visible')
            .click({force: true})

        this.popUpKembalikanNaskah()
    }

    batalKembalikanNaskah() {
        const btnBatalKembalikanNaskah = cy.get(kembalikan_naskah.btnBatalKembalikanNaskah).as('btnBatalKembalikanNaskah')
        btnBatalKembalikanNaskah.should('contain', 'Batal')
            .click()
    }

    popUpKonfirmasiKembalikanNaskah() {
        const popUpKonfirmasiKembalikanNaskah = cy.get(kembalikan_naskah.popUpKonfirmasiKembalikanNaskah).as('popUpKonfirmasiKembalikanNaskah')
        popUpKonfirmasiKembalikanNaskah.should('be.visible')

        const titleKonfirmasiKembalikanNaskah = cy.get(kembalikan_naskah.titleKonfirmasiKembalikanNaskah).as('titleKonfirmasiKembalikanNaskah')
        titleKonfirmasiKembalikanNaskah.should('contain', 'Pastikan anda sudah melengkapi catatan perbaikan sebelum mengirimkan naskah kepada konseptor')

        const subTitleKonfirmasiKembalikanNaskah = cy.get(kembalikan_naskah.subTitleKonfirmasiKembalikanNaskah).as('subTitleKonfirmasiKembalikanNaskah')
        subTitleKonfirmasiKembalikanNaskah.should('contain', 'Naskah ini akan diteruskan ke pihak berikut untuk dilakukan Perbaikan')
    }

    checkBtnPeriksaKembali(inputanKembalikan) {
        this.inputPerihal(inputanKembalikan)

        const btnKembalikanNaskah = cy.get(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .click()

        this.popUpKonfirmasiKembalikanNaskah()

        const btnPeriksaKembali = cy.get(kembalikan_naskah.btnPeriksaKembali).as('btnPeriksaKembali')
        btnPeriksaKembali.should('contain', 'Periksa kembali')
            .click()

        this.popUpKembalikanNaskah()
    }

    inputSifatNaskah() {
        const checkSifatNaskah = cy.get(kembalikan_naskah.checkSifatNaskah).as('checkSifatNaskah')
        checkSifatNaskah.check()

        const inputSifatNaskah = cy.get(kembalikan_naskah.inputSifatNaskah).as('inputSifatNaskah')
        inputSifatNaskah.type('Perbaiki Sifat Naskah')
    }

    inputTembusan() {
        const checkTembusan = cy.get(kembalikan_naskah.checkTembusan).as('checkTembusan')
        checkTembusan.check()

        const inputTembusan = cy.get(kembalikan_naskah.inputTembusan).as('inputTembusan')
        inputTembusan.type('Tambahkan tembusan kepada kepala dinas terkait')
    }

    inputPerihal(inputanKembalikan) {
        const checkPerihal = cy.get(kembalikan_naskah.checkPerihal).as('checkPerihal')
        checkPerihal.check()

        const inputPerihal = cy.get(kembalikan_naskah.inputPerihal).as('inputPerihal')
        inputPerihal.clear()
            .type(inputanKembalikan)
    }

    kembalikanNaskah(inputanKembalikan) {
        this.inputPerihal(inputanKembalikan)

        const btnKembalikanNaskah = cy.get(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .click()

        this.popUpKonfirmasiKembalikanNaskah()

        const btnKirimNaskah = cy.get(kembalikan_naskah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()

        cy.wait(6000)
    }

}