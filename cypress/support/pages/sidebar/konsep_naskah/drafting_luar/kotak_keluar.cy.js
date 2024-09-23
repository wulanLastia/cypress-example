import kotak_keluar from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/kotak_keluar"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"
export class KotakKeluarPage {

    goToKotakKeluarTTEReview() {
        // Click Menu Kotak Keluar
        const btn_menuKotakKeluar = cy.get(kotak_keluar.btn_menuKotakKeluar).as('btn_menuKotakKeluar')
        btn_menuKotakKeluar.should('contain', 'Kotak Keluar')
            .click()

        cy.wait(2000)

        // CLick Menu TTE & Review
        const btn_menuTteReview = cy.get(kotak_keluar.btn_menuTteReview).as('btn_menuTteReview')
        btn_menuTteReview.should('contain', 'TTE & Review')
            .click({force: true})
    }

    checkDetailHalamanKotakKeluar() {
        // Assertion page
        const label_tteReviewTitle = cy.get(kotak_keluar.label_tteReviewTitle).as('label_tteReviewTitle')
        label_tteReviewTitle.should('contain', 'Kotak Keluar')

        const label_tteReviewSubtitle = cy.get(kotak_keluar.label_tteReviewSubtitle).as('label_tteReviewSubtitle')
        label_tteReviewSubtitle.should('contain', 'TTE & Review')

        const input_searchKotakKeluar = cy.get(kotak_keluar.input_searchKotakKeluar).as('input_searchKotakKeluar')
        input_searchKotakKeluar.should('be.visible')

        // @TODO: Assert tombol atur filter

        const label_tableHeader0 = cy.get(kotak_keluar.label_tableHeader0).as('label_tableHeader0')
        label_tableHeader0.find('span')
            .should('contain', 'Status naskah')

        const label_tableHeader2 = cy.get(kotak_keluar.label_tableHeader2).as('label_tableHeader2')
        label_tableHeader2.find('span')
            .should('contain', 'Urgensi')

        const label_tableHeader1 = cy.get(kotak_keluar.label_tableHeader1).as('label_tableHeader1')
        label_tableHeader1.find('span')
            .should('contain', 'Jenis naskah, perihal & nomor naskah')

        const label_tableHeader3 = cy.get(kotak_keluar.label_tableHeader3).as('label_tableHeader3')
        label_tableHeader3.find('span')
            .should('contain', 'Sifat')

        const label_tableheader4 = cy.get(kotak_keluar.label_tableheader4).as('label_tableheader4')
        label_tableheader4.find('span')
            .should('contain', 'Aksi terakhir')

        const table_btnPrevPage = cy.get(kotak_keluar.table_btnPrevPage).as('table_btnPrevPage')
        table_btnPrevPage.scrollIntoView()
            .should('be.visible')
    }

    checkListDataUrgensi() {
        cy.readFile(getPreviewData).then((object) => {
            const urgensiValue = object.identitas_surat[1].urgensi

            const label_tableDataUrgensi = cy.get(kotak_keluar.label_tableDataUrgensi).as('label_tableDataUrgensi')
            label_tableDataUrgensi.find('p')
            .should('contain', urgensiValue)
        })
    }

    checkListDataJenis() {
        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.should('contain', jenisNaskahValue)
        })
    }

    checkListDataSifat() {
        cy.readFile(getPreviewData).then((object) => {
            const sifatValue = object.identitas_surat[2].sifat

            const label_tableDataSifat = cy.get(kotak_keluar.label_tableDataSifat).as('label_tableDataSifat')
            label_tableDataSifat.should('contain', sifatValue)
        })
    }

    checkListDataPerihal() {
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[0].perihal

            const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.find('p')
                .should('contain', perihalValue)
        })
    }

    checkListDataNomorNaskah() {
        cy.readFile(getPreviewData).then((object) => {
            const nomorUrutValue = object.bank_nomor[1].nomor_urut

            const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).as('label_tableDataJenis')
            label_tableDataJenis.find('p')
                .should('contain', nomorUrutValue)
        })
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

    checkNaskahKotakKeluar(inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            const perihal = object.identitas_surat[0].perihal

            if(inputEnv == "staging"){
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                const input_searchKotakKeluar = cy.get(kotak_keluar.input_searchKotakKeluar).first().as('input_searchKotakKeluar')
                input_searchKotakKeluar.find('input')
                    .clear()
                    .type(perihal)

                cy.wait('@checkResponse', { timeout: 10000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).first().as('label_tableDataJenis')
                            label_tableDataJenis.contains('p', perihal)
                                .click()
                        }
                    })
            }else{
                const input_searchKotakKeluar = cy.get(kotak_keluar.input_searchKotakKeluar).first().as('input_searchKotakKeluar')
                input_searchKotakKeluar.find('input')
                    .clear()
                    .type(perihal)

                // Wait until document found
                cy.wait(10000)

                const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).first().as('label_tableDataJenis')
                label_tableDataJenis.contains('p', perihal)
                    .click()
            }   
        })
    }

    checkDetailNaskah() {
        // Assertion Detail 
        const tab_registrasi = cy.get(kotak_keluar.tab_registrasi).as('tab_registrasi')
        tab_registrasi.should('have.class', 'tabs__menu active')

        const tab_history = cy.get(kotak_keluar.tab_history).as('tab_history')
        tab_history.should('have.class', 'tabs__menu')

        const btn_previewPdf = cy.get(kotak_keluar.btn_previewPdf).as('btn_previewPdf')
        btn_previewPdf.should('be.visible')

        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_detailHeaderJenisNaskah = cy.get(kotak_keluar.label_detailHeaderJenisNaskah).as('label_detailHeaderJenisNaskah')
            label_detailHeaderJenisNaskah.should('contain', jenisNaskahValue)
        
            const urgensiValue = object.identitas_surat[1].urgensi

            const label_detailHeaderUrgensi = cy.get(kotak_keluar.label_detailHeaderUrgensi).as('label_detailHeaderUrgensi')
            label_detailHeaderUrgensi.should('contain', urgensiValue)
        })

        // @TODO: Icon status TTE Naskah
    }

    checkDataJenisNaskah() {
        cy.readFile(getPreviewData).then((object) => {
            const jenisNaskahValue = object.upload_file[0].jenis_naskah

            const label_detailJenisNaskah = cy.get(kotak_keluar.label_detailJenisNaskah).as('label_detailJenisNaskah')
            label_detailJenisNaskah.scrollIntoView().should('contain', 'Jenis Naskah')

            const tab_dataJenisNaskah = cy.get(kotak_keluar.tab_dataJenisNaskah).as('tab_dataJenisNaskah')
            tab_dataJenisNaskah.should('contain', jenisNaskahValue)
        })
    }

    checkDataNomorNaskah() {
        cy.readFile(getPreviewData).then((object) => {
            const nomorUrutValue = object.bank_nomor[1].nomor_urut

            const label_detailNomorUrut = cy.get(kotak_keluar.label_detailNomorUrut).as('label_detailNomorUrut')
            label_detailNomorUrut.scrollIntoView().should('contain', 'Nomor Naskah')

            const tab_dataNomorUrut = cy.get(kotak_keluar.tab_dataNomorUrut).as('tab_dataNomorUrut')
            tab_dataNomorUrut.should('contain', nomorUrutValue)
        })
    }

    checkDataUrgensi() {
        cy.readFile(getPreviewData).then((object) => {
            const urgensiValue = object.identitas_surat[1].urgensi

            const label_detailUrgensi = cy.get(kotak_keluar.label_detailUrgensi).as('label_detailUrgensi')
            label_detailUrgensi.scrollIntoView().should('contain', 'Urgensi')

            const tab_dataUrgensi = cy.get(kotak_keluar.tab_dataUrgensi).as('tab_dataUrgensi')
            tab_dataUrgensi.find('p')
                .should('contain', urgensiValue)
        })
    }

    checkDataPerihal() {
        cy.readFile(getPreviewData).then((object) => {
            const perihalValue = object.identitas_surat[0].perihal

            const label_detailPerihal = cy.get(kotak_keluar.label_detailPerihal).as('label_detailPerihal')
            label_detailPerihal.scrollIntoView().should('contain', 'Perihal')

            const tab_dataPerihal = cy.get(kotak_keluar.tab_dataPerihal).as('tab_dataPerihal')
            tab_dataPerihal.should('contain', perihalValue)
        })
    }

    checkDataSifat() {
        cy.readFile(getPreviewData).then((object) => {
            const sifatValue = object.identitas_surat[2].sifat

            const label_detailSifat = cy.get(kotak_keluar.label_detailSifat).as('label_detailSifat')
            label_detailSifat.scrollIntoView().should('contain', 'Sifat')

            const tab_dataSifat = cy.get(kotak_keluar.tab_dataSifat).as('tab_dataSifat')
            tab_dataSifat.should('contain', sifatValue)
        })
    }

    checkDataPenerima() {
        cy.readFile(getPreviewData).then((object) => {
            const label_detailPenerimaTitle = cy.get(kotak_keluar.label_detailPenerimaTitle).as('label_detailPenerimaTitle')
            label_detailPenerimaTitle.scrollIntoView().should('contain', 'Penerima')

            const label_detailPenerimaDescription = cy.get(kotak_keluar.label_detailPenerimaDescription).as('label_detailPenerimaDescription')
            label_detailPenerimaDescription.scrollIntoView().should('contain', 'Naskah ini akan didistribusikan langsung ke akun Sidebar penerima')

            const tujuanInternalValue = object.tujuan_surat[0].tujuan_internal
            const arrTujuanInternal = tujuanInternalValue.split(" (")

            const tab_dataPenerima0 = cy.get(kotak_keluar.tab_dataPenerima0).as('tab_dataPenerima0')
            tab_dataPenerima0.contains(arrTujuanInternal[0], { matchCase: false })
        })
    }

    checkDataPenandatangan(inputScenarioPenandatangan) {
        cy.readFile(getPreviewData).then((object) => {
            const label_detailPenandatanganTitle = cy.get(kotak_keluar.label_detailPenandatanganTitle).as('label_detailPenandatanganTitle')
            label_detailPenandatanganTitle.scrollIntoView().should('contain', 'Penandatangan')

            if(inputScenarioPenandatangan == '2.5') { // Penandatangan diri sendiri, atas nama, untuk beliau
                // Penandatangan Diri Sendiri
                const penandatangan_diri_sendiri = object.penandatangan[0].penandatangan_diri_sendiri

                if(penandatangan_diri_sendiri){
                    const tab_dataPenandatangan0 = cy.get(kotak_keluar.tab_dataPenandatangan0).as('tab_dataPenandatangan0')
                    tab_dataPenandatangan0.contains(penandatangan_diri_sendiri, { matchCase: false })
                }

                // User Atas Nama
                const atasNama = object.penandatangan[1].atas_nama
                const arrAtasNama = atasNama.split('(')
                const arrPositionAtasNama = arrAtasNama[1].split(')')

                // Assert User Atas Nama
                const tab_dataAvatarAtasNama1 = cy.get(kotak_keluar.tab_dataAvatarAtasNama1).as('tab_dataAvatarAtasNama1')
                tab_dataAvatarAtasNama1.scrollIntoView()
                    .should('be.visible')

                const tab_dataAtasNama1 = cy.get(kotak_keluar.tab_dataAtasNama1).as('tab_dataAtasNama1')
                tab_dataAtasNama1.scrollIntoView()
                    .contains(arrAtasNama[0], { matchCase: false })

                const tab_dataJabatanAtasNama1 = cy.get(kotak_keluar.tab_dataJabatanAtasNama1).as('tab_dataJabatanAtasNama1')
                tab_dataJabatanAtasNama1.scrollIntoView()
                    .contains(arrPositionAtasNama[0], { matchCase: false })
                
                // Penandatangan Atas Nama
                const penandatanganAtasNama = object.penandatangan[2].penandatangan_atas_nama
                const arrPenandatanganAtasNama = penandatanganAtasNama.split('(')
                const arrPositionPenandatanganAtasNama = arrPenandatanganAtasNama[1].split(')')

                // Assert Penandatangan Atas Nama
                const tab_dataPenandatanganAtasNama1 = cy.get(kotak_keluar.tab_dataPenandatanganAtasNama1).as('tab_dataPenandatanganAtasNama1')
                tab_dataPenandatanganAtasNama1.contains(arrPenandatanganAtasNama[0], { matchCase: false })

                const tab_dataJabatanPenandatanganAtasNama1 = cy.get(kotak_keluar.tab_dataJabatanPenandatanganAtasNama1).as('tab_dataJabatanPenandatanganAtasNama1')
                tab_dataJabatanPenandatanganAtasNama1.contains(arrPositionPenandatanganAtasNama[0], { matchCase: false })

                // User Untuk Beliau
                const untukBeliau = object.penandatangan[3].untuk_beliau
                const arrUntukBeliau = untukBeliau.split('(')
                const arrPositionUntukBeliau = arrUntukBeliau[1].split(')')

                // Assert User Untuk Beliau
                const tab_dataAvatarUntukBeliau2 = cy.get(kotak_keluar.tab_dataAvatarUntukBeliau2).as('tab_dataAvatarUntukBeliau2')
                tab_dataAvatarUntukBeliau2.scrollIntoView()
                    .should('be.visible')

                const tab_dataUntukBeliau2 = cy.get(kotak_keluar.tab_dataUntukBeliau2).as('tab_dataUntukBeliau2')
                tab_dataUntukBeliau2.contains(arrUntukBeliau[0], { matchCase: false })

                const tab_dataJabatanUntukBeliau2 = cy.get(kotak_keluar.tab_dataJabatanUntukBeliau2).as('tab_dataJabatanUntukBeliau2')
                tab_dataJabatanUntukBeliau2.contains(arrPositionUntukBeliau[0], { matchCase: false })
                
                // Penandatangan Untuk Beliau
                const penandatanganUntukBeliau = object.penandatangan[4].penandatangan_untuk_beliau
                const arrPenandatanganUntukBeliau = penandatanganUntukBeliau.split('(')
                const arrPositionPenandatanganUntukBeliau = arrPenandatanganUntukBeliau[1].split(')')

                // Assert Penandatangan Untuk Beliau
                const tab_dataPenandatanganUntukBeliau2 = cy.get(kotak_keluar.tab_dataPenandatanganUntukBeliau2).as('tab_dataPenandatanganUntukBeliau2')
                tab_dataPenandatanganUntukBeliau2.contains(arrPenandatanganUntukBeliau[0], { matchCase: false })

                const tab_dataJabatanPenandatanganUntukBeliau2 = cy.get(kotak_keluar.tab_dataJabatanPenandatanganUntukBeliau2).as('tab_dataJabatanPenandatanganUntukBeliau2')
                tab_dataJabatanPenandatanganUntukBeliau2.contains(arrPositionPenandatanganUntukBeliau[0], { matchCase: false })
            }
        })
    }

    checkBtnKembali() {
        const btn_headerKembali = cy.get(kotak_keluar.btn_headerKembali).as('btn_headerKembali')
        btn_headerKembali.click()

        // Assertion
        cy.url().should('eq', Cypress.env('base_url') + 'kotak-keluar/tte-review')
    }

    checkNaskahDikembalikan(inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            const perihal = object.identitas_surat[0].perihal

            if(inputEnv == "staging"){
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

                const input_searchKotakKeluar = cy.get(kotak_keluar.input_searchKotakKeluar).first().as('input_searchKotakKeluar')
                input_searchKotakKeluar.find('input')
                    .clear()
                    .type(perihal)

                cy.wait('@checkResponse', { timeout: 10000 })
                    .then((interception) => {
                        if (interception.response.statusCode === 200) {
                            const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).first().as('label_tableDataJenis')
                            label_tableDataJenis.contains('p', perihal)
                        }
                    })
            }else{
                const input_searchKotakKeluar = cy.get(kotak_keluar.input_searchKotakKeluar).first().as('input_searchKotakKeluar')
                input_searchKotakKeluar.find('input')
                    .clear()
                    .type(perihal)

                // Wait until document found
                cy.wait(10000)

                const label_tableDataJenis = cy.get(kotak_keluar.label_tableDataJenis).first().as('label_tableDataJenis')
                label_tableDataJenis.contains('p', perihal)
            } 
            
            // Check status dikembalikan
            const label_tableDataStatus = cy.get(kotak_keluar.label_tableDataStatus).as('label_tableDataStatus')
            label_tableDataStatus.find('p')
                .should('contain', 'Dikembalikan')
        })
    }

    checkDetailStatus() {
        // Check status dikembalikan
        const label_detailStatus = cy.get(kotak_keluar.label_detailStatus).as('label_detailStatus')
        label_detailStatus.find('p')
            .should('contain', 'Selesai')
    }
}