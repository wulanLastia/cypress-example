import tandatangani from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/tandatangani"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"

export class TandatanganiPage {

    tandatanganiNaskah() {
        const btn_tandatanganiNaskah = cy.get(tandatangani.btn_tandatanganiNaskah).as('btn_tandatanganiNaskah')
        btn_tandatanganiNaskah.should('contain', 'TTE Naskah')
            .click()
    }

    tandatanganiNaskahAtasan() {
        const btn_tandTanganiNaskahReview = cy.get(tandatangani.btn_tandTanganiNaskahReview).as('btn_tandTanganiNaskahReview')
        btn_tandTanganiNaskahReview.should('contain', 'TTE Naskah')
            .click()
    }

    checkInputDataRegistrasi(inputScenarioPenandatangan) {
        // Check Popup
        const dialog_konfirmasiTandatangani = cy.get(tandatangani.dialog_konfirmasiTandatangani).as('dialog_konfirmasiTandatangani')
        dialog_konfirmasiTandatangani.should('be.visible')

        const label_tandatanganiNaskah = cy.get(tandatangani.label_tandatanganiNaskah).as('label_tandatanganiNaskah')
        label_tandatanganiNaskah.should('contain', 'Kirim Naskah')

        const label_tandatanganiInfoTitle = cy.get(tandatangani.label_tandatanganiInfoTitle).as('label_tandatanganiInfoTitle')
        label_tandatanganiInfoTitle.should('contain', 'Pastikan kembali naskah Anda sudah benar')

        const label_tandatanganiInfoDesc = cy.get(tandatangani.label_tandatanganiInfoDesc).as('label_tandatanganiInfoDesc')
        label_tandatanganiInfoDesc.should('contain', 'Pastikan nomor urut naskah sesuai dengan file-file yang anda upload')

        // Check Data
        cy.readFile(getPreviewData).then((object) => {
            // Assert Jenis Naskah
            const jenis_naskah = object.upload_file[0].jenis_naskah

            const label_dataJenisNaskah = cy.get(tandatangani.label_dataJenisNaskah).as('label_dataJenisNaskah')
            label_dataJenisNaskah.contains(jenis_naskah, { matchCase: false })

            // Assert Urgensi
            const urgensi = object.identitas_surat[1].urgensi

            const label_dataUrgensi = cy.get(tandatangani.label_dataUrgensi).as('label_dataUrgensi')
            label_dataUrgensi.should('contain', urgensi)

            // Assert Perihal
            const perihal = object.identitas_surat[0].perihal

            const label_dataPerihal = cy.get(tandatangani.label_dataPerihal).as('label_dataPerihal')
            label_dataPerihal.should('contain', perihal)

            // Assert Nomor Naskah
            if (jenis_naskah !== 'Sasaran Kinerja Pegawai (SKP)'){
                const nomor_urut = object.bank_nomor[1].nomor_urut

                const label_dataNomorUrut = cy.get(tandatangani.label_dataNomorUrut).as('label_dataNomorUrut')
                label_dataNomorUrut.should('contain', nomor_urut)
            }
            
            // Assert Nama File
            const upload_file_name = object.upload_file[1].upload_file_name

            const label_dataFileName = cy.get(tandatangani.label_dataFileName).as('label_dataFileName')
            label_dataFileName.should('contain', upload_file_name)

            // Assert Penandatangan
            const label_penandatangan = cy.get(tandatangani.label_penandatangan).as('label_penandatangan')
            label_penandatangan.should('contain', 'Penandatangan')

            if(inputScenarioPenandatangan == '2.5') { // Penandatangan diri sendiri, atas nama, untuk beliau
                // Penandatangan Diri Sendiri
                const penandatangan_diri_sendiri = object.penandatangan[0].penandatangan_diri_sendiri

                if(penandatangan_diri_sendiri){
                    const label_dataNamaPenandatangan = cy.get(tandatangani.label_dataNamaPenandatangan).as('label_dataNamaPenandatangan')
                    label_dataNamaPenandatangan.contains(penandatangan_diri_sendiri, { matchCase: false })
                }

                // User Atas Nama
                const atasNama = object.penandatangan[1].atas_nama
                const arrAtasNama = atasNama.split('(')
                const arrPositionAtasNama = arrAtasNama[1].split(')')

                // Assert User Atas Nama
                const dialog_atasNama1 = cy.get(tandatangani.dialog_atasNama1).as('dialog_atasNama1')
                dialog_atasNama1.should('be.visible')

                const label_dataAtasNama1 = cy.get(tandatangani.label_dataAtasNama1).as('label_dataAtasNama1')
                label_dataAtasNama1.contains(arrAtasNama[0], { matchCase: false })

                const label_dataJabatanAtasNama1 = cy.get(tandatangani.label_dataJabatanAtasNama1).as('label_dataJabatanAtasNama1')
                label_dataJabatanAtasNama1.contains(arrPositionAtasNama[0], { matchCase: false })
                
                // Penandatangan Atas Nama
                const penandatanganAtasNama = object.penandatangan[2].penandatangan_atas_nama
                const arrPenandatanganAtasNama = penandatanganAtasNama.split('(')
                const arrPositionPenandatanganAtasNama = arrPenandatanganAtasNama[1].split(')')

                // Assert Penandatangan Atas Nama
                const label_dataNamaPenandatangan1 = cy.get(tandatangani.label_dataNamaPenandatangan1).as('label_dataNamaPenandatangan1')
                label_dataNamaPenandatangan1.contains(arrPenandatanganAtasNama[0], { matchCase: false })

                const label_dataJabatanPenandatangan1 = cy.get(tandatangani.label_dataJabatanPenandatangan1).as('label_dataJabatanPenandatangan1')
                label_dataJabatanPenandatangan1.contains(arrPositionPenandatanganAtasNama[0], { matchCase: false })

                // User Untuk Beliau
                const untukBeliau = object.penandatangan[3].untuk_beliau
                const arrUntukBeliau = untukBeliau.split('(')
                const arrPositionUntukBeliau = arrUntukBeliau[1].split(')')

                // Assert User Untuk Beliau
                const dialog_untukBeliau2 = cy.get(tandatangani.dialog_untukBeliau2).as('dialog_untukBeliau2')
                dialog_untukBeliau2.scrollIntoView()
                    .should('be.visible')

                const label_dataUntukBeliau2 = cy.get(tandatangani.label_dataUntukBeliau2).as('label_dataUntukBeliau2')
                label_dataUntukBeliau2.contains(arrUntukBeliau[0], { matchCase: false })

                const label_dataJabatanUntukBeliau2 = cy.get(tandatangani.label_dataJabatanUntukBeliau2).as('label_dataJabatanUntukBeliau2')
                label_dataJabatanUntukBeliau2.contains(arrPositionUntukBeliau[0], { matchCase: false })
                
                // Penandatangan Untuk Beliau
                const penandatanganUntukBeliau = object.penandatangan[4].penandatangan_untuk_beliau
                const arrPenandatanganUntukBeliau = penandatanganUntukBeliau.split('(')
                const arrPositionPenandatanganUntukBeliau = arrPenandatanganUntukBeliau[1].split(')')

                // Assert Penandatangan Untuk Beliau
                const label_dataNamaPenandatangan2 = cy.get(tandatangani.label_dataNamaPenandatangan2).as('label_dataNamaPenandatangan2')
                label_dataNamaPenandatangan2.contains(arrPenandatanganUntukBeliau[0], { matchCase: false })

                const label_dataJabatanPenandatangan2 = cy.get(tandatangani.label_dataJabatanPenandatangan2).as('label_dataJabatanPenandatangan2')
                label_dataJabatanPenandatangan2.contains(arrPositionPenandatanganUntukBeliau[0], { matchCase: false })
            }

            // Assert Penerima 
            if (jenis_naskah !== 'Sasaran Kinerja Pegawai (SKP)'){
                cy.get('body').then($body => {
                    if ($body.find(tandatangani.label_penerima).length > 0) {
                        const label_penerima = cy.get(tandatangani.label_penerima).as('label_penerima')
                        label_penerima.scrollIntoView()
                            .should('contain', 'Penerima')

                        const tujuan_surat1 = object.tujuan_surat[0].tujuan_internal

                        if(tujuan_surat1) {
                            let arrPenerima = tujuan_surat1.split('(')

                            const label_dataNamaPenerima = cy.get(tandatangani.label_dataNamaPenerima).as('label_dataNamaPenerima')
                            label_dataNamaPenerima.contains(arrPenerima[0], { matchCase: false })

                            const label_dataJabatanPenerima = cy.get(tandatangani.label_dataJabatanPenerima).as('label_dataJabatanPenerima')
                            label_dataJabatanPenerima.contains(arrPenerima[1].replace(')', ''), { matchCase: false })
                        }

                        const tujuan_internal_0 = object.tujuan_surat[0].tujuan_internal_0

                        if(tujuan_internal_0) {
                            let arrPenerima = tujuan_internal_0.split('(')

                            const label_dataNamaTujuan0 = cy.get(tandatangani.label_dataNamaTujuan0).as('label_dataNamaTujuan0')
                            label_dataNamaTujuan0.contains(arrPenerima[0], { matchCase: false })

                            const label_dataJabatanTujuan0 = cy.get(tandatangani.label_dataJabatanTujuan0).as('label_dataJabatanTujuan0')
                            label_dataJabatanTujuan0.contains(arrPenerima[1].replace(')', ''), { matchCase: false })
                        }

                        const tujuan_internal_1 = object.tujuan_surat[0].tujuan_internal_1

                        if(tujuan_internal_1) {
                            let arrPenerima = tujuan_internal_0.split('(')

                            const label_dataNamaTujuan1 = cy.get(tandatangani.label_dataNamaTujuan1).as('label_dataNamaTujuan1')
                            label_dataNamaTujuan1.contains(arrPenerima[0], { matchCase: false })

                            const label_dataJabatanTujuan1 = cy.get(tandatangani.label_dataJabatanTujuan1).as('label_dataJabatanTujuan1')
                            label_dataJabatanTujuan1.contains(arrPenerima[1].replace(')', ''), { matchCase: false })
                        }

                        const tujuan_internal_2 = object.tujuan_surat[0].tujuan_internal_2

                        if(tujuan_internal_2) {
                            let arrPenerima = tujuan_internal_0.split('(')

                            const label_dataNamaTujuan2 = cy.get(tandatangani.label_dataNamaTujuan2).as('label_dataNamaTujuan2')
                            label_dataNamaTujuan2.contains(arrPenerima[0], { matchCase: false })

                            const label_dataJabatanTujuan2 = cy.get(tandatangani.label_dataJabatanTujuan2).as('label_dataJabatanTujuan2')
                            label_dataJabatanTujuan2.contains(arrPenerima[1].replace(')', ''), { matchCase: false })
                        }
                    }
                })    
            }
        })
    }

    tteNaskah() {
        const btn_tteNaskah = cy.get(tandatangani.btn_tteNaskah).as('btn_tteNaskah')
        btn_tteNaskah.should('contain', 'TTE Naskah')
            .click()

        // Assertion 
        const dialog_panelTte = cy.get(tandatangani.dialog_panelTte).as('dialog_panelTte')
        dialog_panelTte.should('be.visible')

        const dialog_panelTteTitle = cy.get(tandatangani.dialog_panelTteTitle).as('dialog_panelTteTitle')
        dialog_panelTteTitle.should('contain', 'TTE Naskah')
            .and('be.visible')

        const dialog_panelTteDesc = cy.get(tandatangani.dialog_panelTteDesc).as('dialog_panelTteDesc')
        dialog_panelTteDesc.contains('Pastikan anda sudah membaca draft naskah dan yakin isi naskah sudah benar sebelum TTE')
            .and('be.visible')

        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.should('be.visible')

        const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
        btn_tteConfirm.should('contain', 'TTE Naskah')
            .and('be.visible')

        const btn_tteCancel = cy.get(tandatangani.btn_tteCancel).as('btn_tteCancel')
        btn_tteCancel.should('contain', 'Periksa Kembali')
            .and('be.visible')
    }

    tteNaskahAtasan() {
        // Click btn tte naskah
        const btn_tteNaskah = cy.get(tandatangani.btn_tteNaskah).as('btn_tteNaskah')
        btn_tteNaskah.should('contain', 'TTE Naskah')
            .click( { force: true } )

        // Assertion 
        const dialog_panelTte = cy.get(tandatangani.dialog_panelTte).as('dialog_panelTte')
        dialog_panelTte.should('be.visible')

        const dialog_panelTteTitle = cy.get(tandatangani.dialog_panelTteTitle).as('dialog_panelTteTitle')
        dialog_panelTteTitle.should('contain', 'TTE Naskah')
            .and('be.visible')

        const dialog_panelTteDesc = cy.get(tandatangani.dialog_panelTteDesc).as('dialog_panelTteDesc')
        dialog_panelTteDesc.contains('Pastikan anda sudah membaca draft naskah dan yakin isi naskah sudah benar sebelum TTE')
            .and('be.visible')

        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.should('be.visible')

        const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
        btn_tteConfirm.should('contain', 'TTE Naskah')
            .and('be.visible')

        const btn_tteCancel = cy.get(tandatangani.btn_tteCancel).as('btn_tteCancel')
        btn_tteCancel.should('contain', 'Periksa Kembali')
            .and('be.visible')
    }

    confirmTteNaskah(status) {
        if (status === 'negatif') {
            // Assert button disable
            const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
            btn_tteConfirm.should('contain', 'TTE Naskah')
                .and('be.disabled')
        } else {
            const btn_tteConfirm = cy.get(tandatangani.btn_tteConfirm).as('btn_tteConfirm')
            btn_tteConfirm.should('contain', 'TTE Naskah')
                .and('be.visible')
                .click()
        }
    }

    checkInputPassphrase() {
        // Assert inputan passphrase
        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.should('be.visible')

        const dialog_panelIconHideShow = cy.get(tandatangani.dialog_panelIconHideShow).as('dialog_panelIconHideShow')
        dialog_panelIconHideShow.find('svg')
            .should('have.class', 'iconify iconify--material-symbols')
    }

    clickBtnPeriksaKembali() {
        // Click button periksa 
        const btn_tteCancel = cy.get(tandatangani.btn_tteCancel).as('btn_tteCancel')
        btn_tteCancel.should('contain', 'Periksa Kembali')
            .and('be.visible')
            .click()

        // Assertion
        const label_headerDocumentType = cy.get(tandatangani.label_headerDocumentType).as('label_headerDocumentType')
        label_headerDocumentType.should('contain', 'Konsep Naskah')
    }

    submitTteNaskah(passphrase, inputEnv) {
        // Intercept all POST network requests
        if (inputEnv === 'prod') {
            cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
        } else {
            cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
        }

        // Input passphrase
        const dialog_panelInputPassphrase = cy.get(tandatangani.dialog_panelInputPassphrase).as('dialog_panelInputPassphrase')
        dialog_panelInputPassphrase.type(passphrase)
            .wait(1000)

        // Click button tte naskah
        this.confirmTteNaskah('positif')

        // Wait and assert that the response status is 200
        cy.wait('@postRequest', { timeout: 5000 }).then((interception) => {
            if (interception.response) {
                const status = interception.response.statusCode;
                const clientErrorStatusCodes = [400, 401, 403, 404, 405, 406, 408, 409, 410, 411, 412];
                const serverErrorStatusCodes = [500, 501, 502, 503, 504];
                const errorStatusCodes = [...clientErrorStatusCodes, ...serverErrorStatusCodes];

                // Assert for error status codes
                if (errorStatusCodes.includes(status)) {
                    expect(errorStatusCodes, `Request failed with status code: ${status}`).to.include(status);
                }

                const successStatusCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
                const redirectStatusCodes = [300, 301, 302, 303, 307];
                const acceptableStatusCodes = [...successStatusCodes, ...redirectStatusCodes];

                // Assert for success and redirect status codes
                expect(acceptableStatusCodes, `Result of status code: ${status}`).to.include(status);
            } else {
                // Log and throw error if no response is received
                cy.log('No response received.');
                throw new Error('No response received.');
            }
        })

        // Wait for up for the success dialog to appear only 0.5 seconds
        const dialog_successTTENaskah = cy.get(tandatangani.dialog_successTTENaskah, { timeout: 30000 }).as('dialog_successTTENaskah')
        dialog_successTTENaskah.should('be.visible')

        // Wait until tte process
        cy.wait(6000)

        // Cek popup csat
        cy.get('body').then($body => {
            if ($body.find(tandatangani.dialog_csat).length > 0) {
                // Input CSAT
                const dialog_csat = cy.get(tandatangani.dialog_csat).as('dialog_csat')
                dialog_csat.should('be.visible')

                const input_emotCsat = cy.get(tandatangani.input_emotCsat).as('input_emotCsat')
                input_emotCsat.click()

                const input_saranCsat = cy.get(tandatangani.input_saranCsat).as('input_saranCsat')
                input_saranCsat.type('Sip Mantap!')

                const btn_submitCsat = cy.get(tandatangani.btn_submitCsat).as('btn_submitCsat')
                btn_submitCsat.click( { force : true} )

                cy.wait(3000)

                cy.get('body').then($body => {
                    if ($body.find(tandatangani.btn_closeCsat).length > 0) {
                        // Close button csat
                        const btn_closeCsat = cy.get(tandatangani.btn_closeCsat).as('btn_closeCsat')
                        btn_closeCsat.click()
                    }
                })
            }
        })
    }

    kirimNaskah(){
        const btn_kirimNaskah = cy.get(tandatangani.btn_kirimNaskah).as('btn_kirimNaskah')
        btn_kirimNaskah.should('contain', 'Kirim Naskah')
            .click()

        cy.wait(2000)

        this.checkInputDataRegistrasi()

        const btn_confirmKirimNaskah = cy.get(tandatangani.btn_confirmKirimNaskah).as('btn_confirmKirimNaskah')
        btn_confirmKirimNaskah.should('contain', 'Kirim Naskah')
            .click()

        cy.wait(2000)

        // Cek popup csat
        cy.get('body').then($body => {
            if ($body.find(tandatangani.dialog_csat).length > 0) {
                // Input CSAT
                const dialog_csat = cy.get(tandatangani.dialog_csat).as('dialog_csat')
                dialog_csat.should('be.visible')

                const input_emotCsat = cy.get(tandatangani.input_emotCsat).as('input_emotCsat')
                input_emotCsat.click()

                const input_saranCsat = cy.get(tandatangani.input_saranCsat).as('input_saranCsat')
                input_saranCsat.type('Sip Mantap!')

                const btn_submitCsat = cy.get(tandatangani.btn_submitCsat).as('btn_submitCsat')
                btn_submitCsat.click({ force : true})

                cy.wait(3000)

                cy.get('body').then($body => {
                    if ($body.find(tandatangani.btn_closeCsat).length > 0) {
                        // Close button csat
                        const btn_closeCsat = cy.get(tandatangani.btn_closeCsat).as('btn_closeCsat')
                        btn_closeCsat.click({ force : true})
                    }
                })
            }
        })
        
        cy.wait(6000)
    }

    // TODO: Refactor action TTE Ulang
    clickBtnGagalTTE() {
        // Click btn saya mengerti
        const btn_alertConfirm = cy.get(tandatangani.btn_alertConfirm).as('btn_alertConfirm')
        btn_alertConfirm.should('contain', 'Saya mengerti')
            .click()
    }

    batalKirimNaskah() {
        // Click btn kirim naskah
        const btn_kirimNaskah = cy.get(tandatangani.btn_kirimNaskah).as('btn_kirimNaskah')
        btn_kirimNaskah.should('contain', 'Kirim Naskah')
            .click()

        cy.wait(2000)

        // Click btn kembali
        const btn_cancelKirimNaskah = cy.get(tandatangani.btn_cancelKirimNaskah).as('btn_cancelKirimNaskah')
        btn_cancelKirimNaskah.should('contain', 'Kembali')
            .click()

        cy.wait(2000)
    }

    deletePenandatanganIndex(inputIndex) {
        // Click btn delete penandatangan atas nama
        const btn_deletePenandatangan = cy.get(tandatangani.btn_deletePenandatangan + inputIndex + '"]').as('btn_deletePenandatangan')
        btn_deletePenandatangan.should('be.visible')
            .click()
    }
}