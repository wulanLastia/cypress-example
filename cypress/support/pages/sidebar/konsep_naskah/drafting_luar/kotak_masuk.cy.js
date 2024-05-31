import kotak_masuk from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class KotakMasukPage {

    goToKotakMasukTTEReview() {
        // Check onboarding
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.dialog_onboarding).length > 0) {
                // Skip onboarding
                const dialog_onboardingSkip = cy.get(kotak_masuk.dialog_onboardingSkip).as('dialog_onboardingSkip')
                dialog_onboardingSkip.click()

                cy.reload()
            }
        })

        // Click Menu Kotak Masuk
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

    checkStatusNaskah(statusValue) {
        // Check status tag and color
        if (statusValue === 'TTE Ulang') {
            const label_tableDataStatus = cy.get(kotak_masuk.label_tableDataStatus).as('label_tableDataStatus')
            label_tableDataStatus.should('have.class', 'flex min-w-fit w-36 h-[30px] items-center gap-2 px-2 py-1 font-manrope font-semibold text-sm rounded-[30px] text-white bg-[#F44336]')
                .find('p')
                .and('contain', statusValue)
        } else if (statusValue === 'Proses TTE') {
            const label_tableDataStatus = cy.get(kotak_masuk.label_tableDataStatus).as('label_tableDataStatus')
            label_tableDataStatus.should('have.class', 'flex min-w-fit w-36 h-[30px] items-center gap-2 px-2 py-1 font-manrope font-semibold text-sm rounded-[30px] text-[#1565C0] bg-[#E3F2FD] border border-[#90CAF9]')
                .find('p')
                .and('contain', statusValue)
        }
    }

    checkDataUrgensi() {
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[1].urgensi

            const label_tableDataUrgensi = cy.get(kotak_masuk.label_tableDataUrgensi).as('label_tableDataUrgensi')
            label_tableDataUrgensi.find('p')
            .should('contain', perihalValue)
        })
    }

    checkDataJenis() {
        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.should('contain', jenisNaskahValue)
        })
    }

    checkDataSifat() {
        cy.readFile(getPreviewData).then((object) => {
            const sifatValue = object.identitas_surat[2].sifat

            const label_tableDataSifat = cy.get(kotak_masuk.label_tableDataSifat).as('label_tableDataSifat')
            label_tableDataSifat.should('contain', sifatValue)
        })
    }

    checkDataPerihal() {
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[0].perihal

            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.find('p')
                .should('contain', perihalValue)
        })
    }

    checkNextPageData() {
        // Click button next page
        const table_btnNextPage = cy.get(kotak_masuk.table_btnNextPage).as('table_btnNextPage')
        table_btnNextPage.scrollIntoView()
            .click()

        // Assertion Data
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[0].perihal

            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.find('p')
                .should('not.contain', perihalValue)
        })
    }

    checkPrevPageData() {
        // Click button prev page
        const table_btnPrevPage = cy.get(kotak_masuk.table_btnPrevPage).as('table_btnPrevPage')
        table_btnPrevPage.scrollIntoView()
            .click()

        // Assertion Data
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[0].perihal

            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.find('p')
                .should('contain', perihalValue)
        })
    }

    checkPrevPage() {
        const table_btnPrevPage = cy.get(kotak_masuk.table_btnPrevPage).as('table_btnPrevPage')
        table_btnPrevPage.scrollIntoView()
            .should('have.attr', 'disabled', 'disabled')
    }

    checkNextPage() {
        const table_btnNextPage = cy.get(kotak_masuk.table_btnNextPage).as('table_btnNextPage')
        table_btnNextPage.click()
            .then(($val)=>{
                if($val.is(':enabled'))
                    checkNextPage();
                else
                table_btnNextPage.should('have.attr', 'disabled', 'disabled')
            })
    }
}