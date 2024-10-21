import review_verifikasi_surat from "../../../selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import review_naskah from "../../../selectors/sidebar/kotak_masuk/list_review_naskah"
import perbaiki from "../../../selectors/sidebar/kotak_masuk/perbaiki"
import { CreateSuratBiasaPage } from "../konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { UpdateNotaDinasPage } from "../konsep_naskah/nota_dinas/pgs_update_nota_dinas.cy.js"
import { DraftingKepalaSuratPerintahPage } from "../konsep_naskah/surat_perintah/super_drafting_kepala_surat.cy"
import kotak_masuk from "../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const createSuratBiasaPage = new CreateSuratBiasaPage()
const updateNotaDinasPage = new UpdateNotaDinasPage()
const draftingKepalaSuratPerintahPage = new DraftingKepalaSuratPerintahPage()
const perihalNaskah = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"

export class PerbaikiNaskahPage {

    goToPerbaikiNaskah(inputEnv) {// Check layout lama atau baru
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.btn_menuTteReview).css('display') !== 'none') {
                // Click Menu Submenu TTE & Review
                const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
                btn_menuTteReview.should('contain', 'TTE & Review')
                    .click()
                    .wait(9000)

                // Click Tab Review Naskah
                const tab_kotakMasukReviewNaskah = cy.get(kotak_masuk.tab_kotakMasukReviewNaskah).as('tab_kotakMasukReviewNaskah')
                tab_kotakMasukReviewNaskah.should('contain', 'Review Naskah')
                    .click()
                    .wait(6000)

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
                    
                    cy.wait(6000)
        
                    const getbtnPerbaiki = cy.get(perbaiki.getbtnPerbaiki).as('getbtnPerbaiki')
                    getbtnPerbaiki.should('contain', 'Perbaiki')
                        .click()
        
                    this.checkDetail()
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
                                    const tableReviewSurat = cy.get(review_verifikasi_surat.tableReviewSurat).as('tableReviewSurat')
                                    tableReviewSurat.contains('td', titlePerihalNaskah)
                                        .click()
                                }
                            })
                    }
        
                    cy.wait(6000)
        
                    const getbtnPerbaiki = cy.get(perbaiki.getbtnPerbaiki).as('getbtnPerbaiki')
                    getbtnPerbaiki.should('contain', 'Perbaiki')
                        .click()
        
                    this.checkDetail()
                })
            }
        }) 
    }

    goToPerbaikiNaskahNotaDinas(inputEnv) {
        // Check layout lama atau baru
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.btn_menuTteReview).css('display') !== 'none') {
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

                // Click button perbaiki
                const getbtnPerbaiki = cy.get(perbaiki.getbtnPerbaiki).as('getbtnPerbaiki')
                getbtnPerbaiki.should('contain', 'Perbaiki')
                    .click()

                // TODO : Diopen ketika fungsi search pada tabel review naskah sudah berjalan
                // cy.readFile(perihalNaskah).then((object) => {
                //     const titlePerihalNaskah = object.titlePerihal
        
                //     // Wait until page ready
                //     cy.wait(3000)
        
                //     // Check onboarding
                //     cy.get('body').then($body => {
                //         if ($body.find(kotak_masuk.dialog_onboarding).length > 0) {
                //             // Skip onboarding
                //             const dialog_onboardingSkip = cy.get(kotak_masuk.dialog_onboardingSkip).as('dialog_onboardingSkip')
                //             dialog_onboardingSkip.click()
        
                //             cy.reload()
                //         }
                //     })
        
                //     if(inputEnv == "staging"){
                //         cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')
        
                //         const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                //         input_searchKotakMasuk.find('input')
                //             .clear()
                //             .type(titlePerihalNaskah)
        
                //         cy.wait('@checkResponse', { timeout: 10000 })
                //             .then((interception) => {
                //                 if (interception.response.statusCode === 200) {
                //                     const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                //                     table_kotakMasuk.contains('td', titlePerihalNaskah)
                //                         .click()
                //                 }
                //             })
                //     }else{
                //         const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                //         input_searchKotakMasuk.find('input')
                //             .clear()
                //             .type(titlePerihalNaskah)
        
                //         // Wait until document found
                //         cy.wait(10000)
        
                //         const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                //         table_kotakMasuk.contains('td', titlePerihalNaskah)
                //             .click()
                //     }
                    
                // })
            }else {
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

                    cy.wait(6000)

                    const getbtnPerbaiki = cy.get(perbaiki.getbtnPerbaiki).as('getbtnPerbaiki')
                    getbtnPerbaiki.should('contain', 'Perbaiki')
                        .click()

                    this.checkDetailNotaDinas()
                })
            }
        })
    }

    checkDetail() {
        const btnKembali = cy.get(perbaiki.btnKembaliDetail).as('btnKembali')
        btnKembali.should('be.visible')

        const titleHeaderPerbaikiNaskah = cy.get(perbaiki.titleHeaderPerbaikiNaskah).as('titleHeaderPerbaikiNaskah')
        titleHeaderPerbaikiNaskah.should('contain', 'Perbaikan Naskah')
            .and('be.visible')

        const titleHeaderJenisNaskah = cy.get(perbaiki.titleHeaderJenisNaskah).as('titleHeaderJenisNaskah')
        titleHeaderJenisNaskah.should('be.visible')

        const btnEditPerbaikiNaskah = cy.get(perbaiki.btnEditPerbaikiNaskah).as('btnEditPerbaikiNaskah')
        btnEditPerbaikiNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const btnRiwayatPerbaikiNaskah = cy.get(perbaiki.btnRiwayatPerbaikiNaskah).as('btnRiwayatPerbaikiNaskah')
        btnRiwayatPerbaikiNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    checkDetailNotaDinas() {
        const btnKembali = cy.get(perbaiki.btnKembali).as('btnKembali')
        btnKembali.should('be.visible')

        const titleHeaderPerbaikiNaskah = cy.get(perbaiki.titleHeaderPerbaikiNaskah).as('titleHeaderPerbaikiNaskah')
        titleHeaderPerbaikiNaskah.should('contain', 'Perbaikan Naskah')
            .and('be.visible')

        const titleHeaderJenisNaskah = cy.get(perbaiki.titleHeaderJenisNaskah).as('titleHeaderJenisNaskah')
        titleHeaderJenisNaskah.should('contain', 'Nota Dinas')
            .and('be.visible')

        const btnEditPerbaikiNaskah = cy.get(perbaiki.btnEditPerbaikiNaskah).as('btnEditPerbaikiNaskah')
        btnEditPerbaikiNaskah.should('contain', 'Edit Naskah')
            .and('be.visible')

        const btnRiwayatPerbaikiNaskah = cy.get(perbaiki.btnRiwayatPerbaikiNaskah).as('btnRiwayatPerbaikiNaskah')
        btnRiwayatPerbaikiNaskah.should('contain', 'Riwayat Naskah')
            .and('be.visible')
    }

    batalPerbaikiNaskah() {
        const btnKembali = cy.get(perbaiki.btnKembaliDetail).as('btnKembali')
        btnKembali.should('be.visible')
            .click()

        const popupBatalPerbaikiNaskah = cy.get(perbaiki.popupBatalPerbaikiNaskah).as('popupBatalPerbaikiNaskah')
        popupBatalPerbaikiNaskah.should('be.visible')

        const titleBatalPerbaikiNaskah = cy.get(perbaiki.titleBatalPerbaikiNaskah).as('titleBatalPerbaikiNaskah')
        titleBatalPerbaikiNaskah.should('contain', 'Batalkan Konsep Naskah?')
            .and('be.visible')

        const subTitleBatalPerbaikiNaskah = cy.get(perbaiki.subTitleBatalPerbaikiNaskah).as('subTitleBatalPerbaikiNaskah')
        subTitleBatalPerbaikiNaskah.should('contain', 'Naskah ini tidak akan bisa dipulihkan kembali setelah keluar dari halaman ini. Gunakan fitur simpan untuk melanjutkan konsep di lain waktu')
            .and('be.visible')

        const btnKonfirmasiBatalPerbaikiNaskah = cy.get(perbaiki.btnKonfirmasiBatalPerbaikiNaskah).as('btnKonfirmasiBatalPerbaikiNaskah')
        btnKonfirmasiBatalPerbaikiNaskah.should('be.visible')
            .click()

        /* Pengecekan dimatikan sementara karena menunggu desain terbaru up to prod
        const titleKonsepNaskah = cy.get(perbaiki.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain', 'Buat Naskah Baru')
            .and('be.visible')*/
    }

    perbaikiNaskah(inputanPerbaiki) {
        cy.wait(6000)

        const getpreviewKepala = cy.get(perbaiki.getpreviewKepala).as('getpreviewKepala')
        getpreviewKepala.click(180, 240, { force: true })

        createSuratBiasaPage.inputPerbaikiKepalaSurat(inputanPerbaiki)

        const btnKirimPerbaikiNaskah = cy.get(perbaiki.btnKirimPerbaikiNaskah).as('btnKirimPerbaikiNaskah')
        btnKirimPerbaikiNaskah.click()

        const popupKonfirmasiKirimNaskah = cy.get(perbaiki.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(perbaiki.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()

        cy.wait(6000)
    }

    perbaikiNaskahNotaDinas(inputanPerbaiki) {
        cy.wait(20000)

        const getpreviewKepala = cy.get(perbaiki.getpreviewKepala).as('getpreviewKepala')
        getpreviewKepala.click(180, 240, { force: true })

        updateNotaDinasPage.inputPerbaikiKepalaSurat(inputanPerbaiki)

        cy.wait(6000)

        const btnKirimPerbaikiNaskah = cy.get(perbaiki.btnKirimPerbaikiNaskah).as('btnKirimPerbaikiNaskah')
        btnKirimPerbaikiNaskah.click()

        cy.wait(3000)

        const popupKonfirmasiKirimNaskah = cy.get(perbaiki.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(perbaiki.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

    perbaikiNaskahSuratPerintah(inputanPerbaiki) {
        cy.wait(6000)

        const getPreviewKepalaSuratPerintah = cy.get(perbaiki.getPreviewKepalaSuratPerintah).as('getPreviewKepalaSuratPerintah')
        getPreviewKepalaSuratPerintah.click(180, 240, { force: true })

        draftingKepalaSuratPerintahPage.inputPerihal(inputanPerbaiki)

        const btnKirimPerbaikiNaskahSuratPerintah = cy.get(perbaiki.btnKirimPerbaikiNaskahSuratPerintah).as('btnKirimPerbaikiNaskahSuratPerintah')
        btnKirimPerbaikiNaskahSuratPerintah.click()

        const popupKonfirmasiKirimNaskah = cy.get(perbaiki.popupKonfirmasiKirimNaskah).as('popupKonfirmasiKirimNaskah')
        popupKonfirmasiKirimNaskah.should('be.visible')

        const btnKonfirmasiKirimNaskah = cy.get(perbaiki.btnKonfirmasiKirimNaskah).as('btnKonfirmasiKirimNaskah')
        btnKonfirmasiKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

}