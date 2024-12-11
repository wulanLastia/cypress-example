import review_verifikasi_surat from "@selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import review_naskah from "@selectors/sidebar/kotak_masuk/list_review_naskah"
import koreksi from "@selectors/sidebar/kotak_masuk/koreksi"
import kotak_masuk from "@selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"
import { MenuPage } from "../menu/menu.cy"
import { CreateSuratBiasaPage } from "../konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { UpdateNotaDinasPage } from "../konsep_naskah/nota_dinas/pgs_update_nota_dinas.cy.js"
import { DraftingKepalaSuratPerintahPage } from "../konsep_naskah/surat_perintah/super_drafting_kepala_surat.cy"

const menuPage = new MenuPage()
const createSuratBiasaPage = new CreateSuratBiasaPage()
const updateNotaDinasPage = new UpdateNotaDinasPage()
const draftingKepalaSuratPerintahPage = new DraftingKepalaSuratPerintahPage()

const perihalNaskah = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"

export class KoreksiSuratPage {

    goToNaskahBelumDireview(inputEnv) {// Check layout lama atau baru
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.btn_menuTteReview).css('display') !== 'none') {
                // Click Menu Submenu TTE & Review
                const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
                btn_menuTteReview.should('contain', 'TTE & Review')
                    .click()

                cy.readFile(perihalNaskah).then((object) => {
                    const titlePerihalNaskah = object.titlePerihal
        
                    // Wait until page ready
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
                                    const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
                                    label_tableDataJenis.should('contain', titlePerihalNaskah)
                                        .click()
                                }
                            })
                    }

                    cy.wait(6000)
                })
            }
        })  
    }

    checkDetailKoreksiTandatangani() {
        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click()

        cy.wait(3000)

        const btnKembaliKoreksi = cy.get(koreksi.btnKembaliKoreksi).as('btnKembaliKoreksi')
        btnKembaliKoreksi.should('be.visible')

        const titleDetailKoreksi = cy.get(koreksi.titleDetailKoreksi).as('titleDetailKoreksi')
        titleDetailKoreksi.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.should('contain', 'Tandatangani')
            .and('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    checkDetailKoreksiSetujui() {
        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click()

        cy.wait(3000)

        const btnKembaliKoreksi = cy.get(koreksi.btnKembaliKoreksi).as('btnKembaliKoreksi')
        btnKembaliKoreksi.should('be.visible')

        const titleDetailKoreksi = cy.get(koreksi.titleDetailKoreksi).as('titleDetailKoreksi')
        titleDetailKoreksi.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const btnKirimNaskah = cy.get(koreksi.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim Naskah')
            .and('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    checkDetailKoreksiTandatanganiNotaDinas() {
        cy.wait(5000)

        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click({ force: true })
            .wait(8000)

        cy.wait(3000)

        const btnKembaliKoreksi = cy.get(koreksi.btnKembaliKoreksi).as('btnKembaliKoreksi')
        btnKembaliKoreksi.should('be.visible')

        const titleDetailKoreksi = cy.get(koreksi.titleDetailKoreksi).as('titleDetailKoreksi')
        titleDetailKoreksi.should('contain', 'Konsep Naskah')
            .and('be.visible')

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.should('contain', 'Tandatangani')
            .and('be.visible')

        const previewNaskahNotaDinas = cy.get(koreksi.previewNaskahNotaDinas).as('previewNaskahNotaDinas')
        previewNaskahNotaDinas.should('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    checkDetail() {
        const getbtnKoreksi = cy.get(koreksi.getbtnKoreksi).as('getbtnKoreksi')
        getbtnKoreksi.should('contain', 'Koreksi')
            .click()

        cy.wait(3000)

        const btnKembali = cy.get(koreksi.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleKoreksi = cy.get(koreksi.titleKoreksi).as('titleKoreksi')
        titleKoreksi.should('contain', 'Review Naskah')
            .and('be.visible')

        const btnKirimNaskah = cy.get(koreksi.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim Naskah')
            .and('be.visible')

        const previewNaskah = cy.get(koreksi.previewNaskah).as('previewNaskah')
        previewNaskah.should('be.visible')

        const tabEditNaskah = cy.get(koreksi.tabEditNaskah).as('tabEditNaskah')
        tabEditNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const tabRiwayatNaskah = cy.get(koreksi.tabRiwayatNaskah).as('tabRiwayatNaskah')
        tabRiwayatNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    koreksiTandatanganiNaskah(passphrase, inputanKoreksi) {
        createSuratBiasaPage.inputKoreksiKepalaSurat(inputanKoreksi)

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.click()

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')

        const inputPassphrase = cy.get(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.get(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }

    koreksiTandatanganiNaskahNotaDinas(passphrase) {
        updateNotaDinasPage.inputKoreksiKepalaSurat()

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.click()

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')

        const inputPassphrase = cy.get(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.get(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }


    koreksiNaskah(inputanKoreksi) {
        createSuratBiasaPage.inputKoreksiKepalaSurat(inputanKoreksi)

        const btnKirimNaskah = cy.get(koreksi.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()

        const popupKonfirmasiKirimNaskah = cy.get(koreksi.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(koreksi.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    koreksiSetujuiSuratPerintah(inputanKoreksi) {
        draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat()

        draftingKepalaSuratPerintahPage.inputPerihal(inputanKoreksi)

        const btnKirimNaskah = cy.get(koreksi.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.click()

        const popupKonfirmasiKirimNaskah = cy.get(koreksi.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(koreksi.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    koreksiTandatanganiSuratPerintah(passphrase, inputanKoreksi) {
        draftingKepalaSuratPerintahPage.aksesFormEditingKepalaSurat()

        draftingKepalaSuratPerintahPage.inputPerihal(inputanKoreksi)

        const btnKoreksiTandatangani = cy.get(koreksi.btnKoreksiTandatangani).as('btnKoreksiTandatangani')
        btnKoreksiTandatangani.click()

        const getpopupKonfirmasiTandatanganiNaskah = cy.get(koreksi.getpopupKonfirmasiTandatanganiNaskah).as('getpopupKonfirmasiTandatanganiNaskah')
        getpopupKonfirmasiTandatanganiNaskah.should('be.visible')

        const inputPassphrase = cy.get(koreksi.inputPassphrase).as('inputPassphrase')
        inputPassphrase.type(passphrase)

        cy.wait(2000)

        const btnTandatanganiNaskah = cy.get(koreksi.btnTandatanganiNaskah).as('btnTandatanganiNaskah')
        btnTandatanganiNaskah.should('contain', 'Tandatangani')
            .click()
    }

    goToKoreksiTandatanganiNaskah() {
        // Go To Menu Kotak Masuk
        const btn_menuKotakMasuk = cy.get(kotak_masuk.btn_menuKotakMasuk).as('btn_menuKotakMasuk')
        btn_menuKotakMasuk.should('contain', 'Kotak Masuk')
            .click()
            .wait(3000)

        // Click Menu Submenu TTE & Review
        const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
        btn_menuTteReview.should('contain', 'TTE & Review')
            .click()
            .wait(3000)

        // Click Tab Review Naskah
        const tab_kotakMasukReviewNaskah = cy.get(kotak_masuk.tab_kotakMasukReviewNaskah).as('tab_kotakMasukReviewNaskah')
        tab_kotakMasukReviewNaskah.should('contain', 'Review Naskah')
            .click()
            .wait(6000)

        // Get data terakhir 
        const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
        label_tableDataJenis.click()
            .wait(6000)
    }

}