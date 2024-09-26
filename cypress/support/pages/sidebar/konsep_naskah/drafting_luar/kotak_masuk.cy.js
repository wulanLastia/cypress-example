import kotak_masuk from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_masuk"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class KotakMasukPage {

    goToKotakMasukTTEReview() {
        // Click Menu Kotak Masuk
        const btn_menuKotakMasuk = cy.get(kotak_masuk.btn_menuKotakMasuk).as('btn_menuKotakMasuk')
        btn_menuKotakMasuk.should('contain', 'Kotak Masuk')
            .click()

        // CLick Menu TTE & Review
        const btn_menuTteReview = cy.get(kotak_masuk.btn_menuTteReview).as('btn_menuTteReview')
        btn_menuTteReview.should('contain', 'TTE & Review')
            .click()

        cy.wait(6000)

        // Check onboarding
        cy.get('body').then($body => {
            if ($body.find(kotak_masuk.dialog_onboarding).length > 0) {
                // Skip onboarding
                const dialog_onboardingSkip = cy.get(kotak_masuk.dialog_onboardingSkip).as('dialog_onboardingSkip')
                dialog_onboardingSkip.click()

                cy.reload()
            }
        })

        cy.wait(10000)
    }

    checkNaskahKotakMasuk(inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            const perihal = object.identitas_surat[0].perihal

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
                    .type(perihal)

                cy.wait('@checkResponse', { timeout: 10000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                            table_kotakMasuk.contains('td', perihal)
                                .click()
                        }
                    })
            }else{
                const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                input_searchKotakMasuk.find('input')
                    .clear()
                    .type(perihal)

                // Wait until document found
                cy.wait(10000)

                const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                table_kotakMasuk.contains('td', perihal)
                    .click()
            }
            
            cy.wait(12000)
        })
    }

    checkStatusdanDetailNaskah() {
        // Assertion Detail
        const tab_registrasi = cy.get(kotak_masuk.tab_registrasi).as('tab_registrasi')
        tab_registrasi.should('have.class', 'tabs__menu active')

        const tab_history = cy.get(kotak_masuk.tab_history).as('tab_history')
        tab_history.should('have.class', 'tabs__menu')

        const btn_previewPdf = cy.get(kotak_masuk.btn_previewPdf).as('btn_previewPdf')
        btn_previewPdf.should('be.visible')

        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_detailHeaderJenisNaskah = cy.get(kotak_masuk.label_detailHeaderJenisNaskah).as('label_detailHeaderJenisNaskah')
            label_detailHeaderJenisNaskah.should('contain', jenisNaskahValue)
        
            const urgensiValue = object.identitas_surat[1].urgensi

            const label_detailHeaderUrgensi = cy.get(kotak_masuk.label_detailHeaderUrgensi).as('label_detailHeaderUrgensi')
            label_detailHeaderUrgensi.should('contain', urgensiValue)
        })

        // @TODO: Icon status TTE Naskah
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

    checkListDataUrgensi() {
        cy.readFile(getPreviewData).then((object) => {
            const urgensiValue = object.identitas_surat[1].urgensi

            const label_tableDataUrgensi = cy.get(kotak_masuk.label_tableDataUrgensi).as('label_tableDataUrgensi')
            label_tableDataUrgensi.find('p')
            .should('contain', urgensiValue)
        })
    }

    checkListDataJenis() {
        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_tableDataJenis = cy.get(kotak_masuk.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.should('contain', jenisNaskahValue)
        })
    }

    checkListDataSifat() {
        cy.readFile(getPreviewData).then((object) => {
            const sifatValue = object.identitas_surat[2].sifat

            const label_tableDataSifat = cy.get(kotak_masuk.label_tableDataSifat).as('label_tableDataSifat')
            label_tableDataSifat.should('contain', sifatValue)
        })
    }

    checkListDataPerihal() {
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

    checkBtnTte() {
        const btn_headerTteNaskah = cy.get(kotak_masuk.btn_headerTteNaskah).as('btn_headerTteNaskah')
        btn_headerTteNaskah.should('be.visible')
            .and('contain', 'TTE Naskah')
    }

    checkDataJenisNaskah() {
        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_detailJenisNaskah = cy.get(kotak_masuk.label_detailJenisNaskah).as('label_detailJenisNaskah')
            label_detailJenisNaskah.scrollIntoView().should('contain', 'Jenis Naskah')

            const tab_dataJenisNaskah = cy.get(kotak_masuk.tab_dataJenisNaskah).as('tab_dataJenisNaskah')
            tab_dataJenisNaskah.should('contain', jenisNaskahValue)
        })
    }

    checkDataNomorNaskah() {
        cy.readFile(getPreviewData).then((object) => {
            const nomorUrutValue = object.bank_nomor[1].nomor_urut

            const label_detailNomorUrut = cy.get(kotak_masuk.label_detailNomorUrut).as('label_detailNomorUrut')
            label_detailNomorUrut.scrollIntoView().should('contain', 'Nomor Naskah')

            const tab_dataNomorUrut = cy.get(kotak_masuk.tab_dataNomorUrut).as('tab_dataNomorUrut')
            tab_dataNomorUrut.should('contain', nomorUrutValue)
        })
    }

    checkDataUrgensi() {
        cy.readFile(getPreviewData).then((object) => {
            const urgensiValue = object.identitas_surat[1].urgensi

            const label_detailUrgensi = cy.get(kotak_masuk.label_detailUrgensi).as('label_detailUrgensi')
            label_detailUrgensi.scrollIntoView().should('contain', 'Urgensi')

            const tab_dataUrgensi = cy.get(kotak_masuk.tab_dataUrgensi).as('tab_dataUrgensi')
            tab_dataUrgensi.find('p')
                .should('contain', urgensiValue)
        })
    }

    checkDataPerihal() {
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[0].perihal

            const label_detailPerihal = cy.get(kotak_masuk.label_detailPerihal).as('label_detailPerihal')
            label_detailPerihal.scrollIntoView().should('contain', 'Perihal')

            const tab_dataPerihal = cy.get(kotak_masuk.tab_dataPerihal).as('tab_dataPerihal')
            tab_dataPerihal.should('contain', perihalValue)
        })
    }

    checkDataSifat() {
        cy.readFile(getPreviewData).then((object) => {
            const sifatValue = object.identitas_surat[2].sifat

            const label_detailSifat = cy.get(kotak_masuk.label_detailSifat).as('label_detailSifat')
            label_detailSifat.scrollIntoView().should('contain', 'Sifat')

            const tab_dataSifat = cy.get(kotak_masuk.tab_dataSifat).as('tab_dataSifat')
            tab_dataSifat.should('contain', sifatValue)
        })
    }

    checkDataPenerima() {
        cy.readFile(getPreviewData).then((object) => {
            const label_detailPenerimaTitle = cy.get(kotak_masuk.label_detailPenerimaTitle).as('label_detailPenerimaTitle')
            label_detailPenerimaTitle.scrollIntoView().should('contain', 'Penerima')

            const label_detailPenerimaDescription = cy.get(kotak_masuk.label_detailPenerimaDescription).as('label_detailPenerimaDescription')
            label_detailPenerimaDescription.scrollIntoView().should('contain', 'Naskah ini akan didistribusikan langsung ke akun Sidebar penerima')

            const tujuanInternalValue = object.tujuan_surat[0].tujuan_internal
            const arrTujuanInternal = tujuanInternalValue.split(" (")

            const tab_dataPenerima0 = cy.get(kotak_masuk.tab_dataPenerima0).as('tab_dataPenerima0')
            tab_dataPenerima0.contains(arrTujuanInternal[0], { matchCase: false })
        })
    }

    checkDataPenandatangan(inputScenarioPenandatangan) {
        cy.readFile(getPreviewData).then((object) => {
            const label_detailPenandatanganTitle = cy.get(kotak_masuk.label_detailPenandatanganTitle).as('label_detailPenandatanganTitle')
            label_detailPenandatanganTitle.scrollIntoView().should('contain', 'Penandatangan')

            if(inputScenarioPenandatangan == '2.5') { // Penandatangan diri sendiri, atas nama, untuk beliau
                // Penandatangan Diri Sendiri
                const penandatangan_diri_sendiri = object.penandatangan[0].penandatangan_diri_sendiri

                if(penandatangan_diri_sendiri){
                    const tab_dataPenandatangan0 = cy.get(kotak_masuk.tab_dataPenandatangan0).as('tab_dataPenandatangan0')
                    tab_dataPenandatangan0.contains(penandatangan_diri_sendiri, { matchCase: false })
                }

                // User Atas Nama
                const atasNama = object.penandatangan[1].atas_nama
                const arrAtasNama = atasNama.split('(')
                const arrPositionAtasNama = arrAtasNama[1].split(')')

                // Assert User Atas Nama
                const tab_dataAvatarAtasNama1 = cy.get(kotak_masuk.tab_dataAvatarAtasNama1).as('tab_dataAvatarAtasNama1')
                tab_dataAvatarAtasNama1.scrollIntoView()
                    .should('be.visible')

                const tab_dataAtasNama1 = cy.get(kotak_masuk.tab_dataAtasNama1).as('tab_dataAtasNama1')
                tab_dataAtasNama1.scrollIntoView()
                    .contains(arrAtasNama[0], { matchCase: false })

                const tab_dataJabatanAtasNama1 = cy.get(kotak_masuk.tab_dataJabatanAtasNama1).as('tab_dataJabatanAtasNama1')
                tab_dataJabatanAtasNama1.scrollIntoView()
                    .contains(arrPositionAtasNama[0], { matchCase: false })
                
                // Penandatangan Atas Nama
                const penandatanganAtasNama = object.penandatangan[2].penandatangan_atas_nama
                const arrPenandatanganAtasNama = penandatanganAtasNama.split('(')
                const arrPositionPenandatanganAtasNama = arrPenandatanganAtasNama[1].split(')')

                // Assert Penandatangan Atas Nama
                const tab_dataPenandatanganAtasNama1 = cy.get(kotak_masuk.tab_dataPenandatanganAtasNama1).as('tab_dataPenandatanganAtasNama1')
                tab_dataPenandatanganAtasNama1.contains(arrPenandatanganAtasNama[0], { matchCase: false })

                const tab_dataJabatanPenandatanganAtasNama1 = cy.get(kotak_masuk.tab_dataJabatanPenandatanganAtasNama1).as('tab_dataJabatanPenandatanganAtasNama1')
                tab_dataJabatanPenandatanganAtasNama1.contains(arrPositionPenandatanganAtasNama[0], { matchCase: false })

                // User Untuk Beliau
                const untukBeliau = object.penandatangan[3].untuk_beliau
                const arrUntukBeliau = untukBeliau.split('(')
                const arrPositionUntukBeliau = arrUntukBeliau[1].split(')')

                // Assert User Untuk Beliau
                const tab_dataAvatarUntukBeliau2 = cy.get(kotak_masuk.tab_dataAvatarUntukBeliau2).as('tab_dataAvatarUntukBeliau2')
                tab_dataAvatarUntukBeliau2.scrollIntoView()
                    .should('be.visible')

                const tab_dataUntukBeliau2 = cy.get(kotak_masuk.tab_dataUntukBeliau2).as('tab_dataUntukBeliau2')
                tab_dataUntukBeliau2.contains(arrUntukBeliau[0], { matchCase: false })

                const tab_dataJabatanUntukBeliau2 = cy.get(kotak_masuk.tab_dataJabatanUntukBeliau2).as('tab_dataJabatanUntukBeliau2')
                tab_dataJabatanUntukBeliau2.contains(arrPositionUntukBeliau[0], { matchCase: false })
                
                // Penandatangan Untuk Beliau
                const penandatanganUntukBeliau = object.penandatangan[4].penandatangan_untuk_beliau
                const arrPenandatanganUntukBeliau = penandatanganUntukBeliau.split('(')
                const arrPositionPenandatanganUntukBeliau = arrPenandatanganUntukBeliau[1].split(')')

                // Assert Penandatangan Untuk Beliau
                const tab_dataPenandatanganUntukBeliau2 = cy.get(kotak_masuk.tab_dataPenandatanganUntukBeliau2).as('tab_dataPenandatanganUntukBeliau2')
                tab_dataPenandatanganUntukBeliau2.contains(arrPenandatanganUntukBeliau[0], { matchCase: false })

                const tab_dataJabatanPenandatanganUntukBeliau2 = cy.get(kotak_masuk.tab_dataJabatanPenandatanganUntukBeliau2).as('tab_dataJabatanPenandatanganUntukBeliau2')
                tab_dataJabatanPenandatanganUntukBeliau2.contains(arrPositionPenandatanganUntukBeliau[0], { matchCase: false })
            }
        })
    }

    checkBtnKembali() {
        const btn_headerKembali = cy.get(kotak_masuk.btn_headerKembali).as('btn_headerKembali')
        btn_headerKembali.click()

        // Assertion
        cy.url().should('eq', Cypress.env('base_url') + 'kotak-masuk/tte-review')
    }

    goToPerbaikiNaskah(inputEnv) {
        // Click Tab Review Naskah
        const tab_kotakMasukReviewNaskah = cy.get(kotak_masuk.tab_kotakMasukReviewNaskah).as('tab_kotakMasukReviewNaskah')
        tab_kotakMasukReviewNaskah.should('contain', 'Review Naskah')
            .click()
            .wait(6000)

        cy.readFile(getPreviewData).then((object) => {
            const perihal = object.identitas_surat[0].perihal

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
                    .type(perihal)

                cy.wait('@checkResponse', { timeout: 10000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                            table_kotakMasuk.contains('td', perihal)
                                .click()
                        }
                    })
            }else{
                const input_searchKotakMasuk = cy.get(kotak_masuk.input_searchKotakMasuk).first().as('input_searchKotakMasuk')
                input_searchKotakMasuk.find('input')
                    .clear()
                    .type(perihal)

                // Wait until document found
                cy.wait(10000)

                const table_kotakMasuk = cy.get(kotak_masuk.table_kotakMasuk).as('table_kotakMasuk')
                table_kotakMasuk.contains('td', perihal)
                    .click()
            }
            
            cy.wait(12000)
        })
    }
}