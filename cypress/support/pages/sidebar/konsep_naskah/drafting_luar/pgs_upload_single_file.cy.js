import upload_single from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/upload_single_file"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"
export class UploadSingleFilePage {

    goToUploadSingleFileSuratBiasa() {
        // Find Document Type
        const list_listJenisNaskahSuratBiasa = cy.get(upload_single.list_listJenisNaskahSuratBiasa).as('list_listJenisNaskahSuratBiasa')
        list_listJenisNaskahSuratBiasa.find('div')
            .contains('Surat Biasa')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleSuratBiasa = cy.get(upload_single.list_naskahTitleSuratBiasa).as('list_naskahTitleSuratBiasa')
        list_naskahTitleSuratBiasa.should('contain', 'Surat Biasa')
            .and('be.visible')

        const btn_draftSuratBiasa = cy.get(upload_single.btn_draftSuratBiasa).as('btn_draftSuratBiasa')
        btn_draftSuratBiasa.should('contain', 'Buat Draft')
            .and('be.visible')

        const btn_uploadFileSuratBiasa = cy.get(upload_single.btn_uploadFileSuratBiasa).as('btn_uploadFileSuratBiasa')
        btn_uploadFileSuratBiasa.should('contain', 'Upload')
            .and('be.visible')

        const btn_templateSuratBiasa = cy.get(upload_single.btn_templateSuratBiasa).as('btn_templateSuratBiasa')
        btn_templateSuratBiasa.should('contain', 'Template')
            .and('be.visible')

        // Access Upload Single File
        btn_uploadFileSuratBiasa.click()
            .wait(30000)

        // Begin Save Assertion Data
        cy.readFile(getPreviewData).then((object) => {
            const createDataToWrite = {
                upload_file: []
            }

            // Construct the sub-object
            const jenis_naskah_name = {
                jenis_naskah: 'Surat Biasa'
            }

            // Push the sub-object to the array
            createDataToWrite.upload_file.push(jenis_naskah_name)

            // // Write data to the JSON file
            cy.writeFile(getPreviewData, createDataToWrite)
        })
    }

    checkDetailJenisNaskah(jenis_naskah) {
        const label_headerDocumentType = cy.get(upload_single.label_headerDocumentType).as('label_headerDocumentType')
        label_headerDocumentType.contains(jenis_naskah, { matchCase: false })
    }

    checkDetailButtonKirim() {
        const btn_headerButtonSubmit = cy.get(upload_single.btn_headerButtonSubmit).as('btn_headerButtonSubmit')
        btn_headerButtonSubmit.should('contain', 'Kirim')
            .and('be.visible')
    }

    uploadSingleFile(status) {
        if (status === 'positif') {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/Dummy.pdf'
            const fileName = 'Dummy.pdf'

            const btn_inputNaskahButtonUploadFile = cy.get(upload_single.btn_inputNaskahButtonUploadFile).as('btn_inputNaskahButtonUploadFile')
            btn_inputNaskahButtonUploadFile.attachFile(fileUploadSingleFile)

            // Begin Save Assertion Data
            cy.readFile(getPreviewData).then((object) => {
                if (!object.upload_file) {
                    object.upload_file = [];
                }

                // Construct the sub-object
                const upload_file_name = {
                    upload_file_name: fileName
                }

                // Push the sub-object to the array
                object.upload_file.push(upload_file_name)

                // // Write data to the JSON file
                cy.writeFile(getPreviewData, object)
            })
        } else {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/image_example.jpg'

            const btn_inputNaskahButtonUploadFile = cy.get(upload_single.btn_inputNaskahButtonUploadFile).as('btn_inputNaskahButtonUploadFile')
            btn_inputNaskahButtonUploadFile.attachFile(fileUploadSingleFile)

            // Assertion file upload
            const label_fileNotSupport = cy.get(upload_single.label_fileNotSupport).as('label_fileNotSupport')
            label_fileNotSupport.should('be.visible')
        }

        cy.wait(3000)
    }

    checkDataFileUpload() {
        cy.readFile(getPreviewData).then((object) => {
            // Assertion file upload
            const upload_file_name = object.upload_file[1].upload_file_name

            const label_fileUploadTitle = cy.get(upload_single.label_fileUploadTitle).as('label_fileUploadTitle')
            label_fileUploadTitle.should('contain', upload_file_name)

            const label_fileUploadSize = cy.get(upload_single.label_fileUploadSize).as('label_fileUploadSize')
            label_fileUploadSize.should('contain', '18.3 KB')

            const btn_reuploadFile = cy.get(upload_single.btn_reuploadFile).as('btn_reuploadFile')
            btn_reuploadFile.should('be.visible')

            const btn_deleteFile = cy.get(upload_single.btn_deleteFile).as('btn_deleteFile')
            btn_deleteFile.should('be.visible')
        })
    }

    checkTabRegistrasi(status) {
        const btn_tabDocumentRegistration = cy.get(upload_single.btn_tabDocumentRegistration).as('btn_tabDocumentRegistration')
        btn_tabDocumentRegistration.should('be.visible')

        if (status === 'Before') {
            btn_tabDocumentRegistration.and('be.disabled')
        } else {
            btn_tabDocumentRegistration.and('be.enabled')
        }
    }

    batalDrafting() {
        // Action click button back
        const btn_headerButtonBack = cy.get(upload_single.btn_headerButtonBack).as('btn_headerButtonBack')
        btn_headerButtonBack.should('be.visible')
            .click()

        // Assertion 
        const dialog_backPanel = cy.get(upload_single.dialog_backPanel).as('dialog_backPanel')
        dialog_backPanel.should('be.visible')

        const dialog_backTitle = cy.get(upload_single.dialog_backTitle).as('dialog_backTitle')
        dialog_backTitle.should('contain', 'Keluar Halaman')

        const dialog_backDesc = cy.get(upload_single.dialog_backDesc).as('dialog_backDesc')
        dialog_backDesc.should('contain', 'Draft yang diupload dan data registrasi akan terhapus saat Anda keluar dari halaman ini.')

        const dialog_backCancel = cy.get(upload_single.dialog_backCancel).as('dialog_backCancel')
        dialog_backCancel.should('contain', 'Tidak')
            .and('be.visible')

        const dialog_backConfirm = cy.get(upload_single.dialog_backConfirm).last().as('dialog_backConfirm')
        dialog_backConfirm.should('contain', 'Ya, keluar dan hapus')
            .click()
    }

    batalDeleteFileUpload() {
        // Click button delete file
        const btn_deleteFile = cy.get(upload_single.btn_deleteFile).as('btn_deleteFile')
        btn_deleteFile.should('be.visible')
            .click()

        // Assertion
        const dialog_backPanel = cy.get(upload_single.dialog_backPanel).as('dialog_backPanel')
        dialog_backPanel.should('be.visible')

        const dialog_backTitle = cy.get(upload_single.dialog_backTitle).as('dialog_backTitle')
        dialog_backTitle.should('contain', 'Hapus Draft')

        const dialog_backDesc = cy.get(upload_single.dialog_backDesc).as('dialog_backDesc')
        dialog_backDesc.find('p')
            .should('contain', 'Apakah anda ingin menghapus file')

        const dialog_backConfirm = cy.get(upload_single.dialog_backConfirm).first().as('dialog_backConfirm')
        dialog_backConfirm.find('div')
            .find('span')
            .should('contain', 'Ya, hapus file')

        const dialog_backCancel = cy.get(upload_single.dialog_backCancel).first().as('dialog_backCancel')
        dialog_backCancel.should('contain', 'Tidak')
            .and('be.visible')
            .click()
    }

    checkDeleteFileUpload() {
        // Click button delete file
        const btn_deleteFile = cy.get(upload_single.btn_deleteFile).as('btn_deleteFile')
        btn_deleteFile.should('be.visible')
            .click()

        // Assertion
        const dialog_backPanel = cy.get(upload_single.dialog_backPanel).as('dialog_backPanel')
        dialog_backPanel.should('be.visible')

        const dialog_backTitle = cy.get(upload_single.dialog_backTitle).as('dialog_backTitle')
        dialog_backTitle.should('contain', 'Hapus Draft')

        const dialog_backDesc = cy.get(upload_single.dialog_backDesc).as('dialog_backDesc')
        dialog_backDesc.find('p')
            .should('contain', 'Dummy.pdf')

        const dialog_backConfirm = cy.get(upload_single.dialog_backConfirm).first().as('dialog_backConfirm')
        dialog_backConfirm.find('div')
            .find('span')
            .should('contain', 'Ya, hapus file')
            .click()
    }

    goToUploadSingleFileSkp() {
        // Check onboarding
        cy.get('body').then($body => {
            if ($body.find(upload_single.dialog_onboarding).length > 0) {
                // Skip onboarding
                const dialog_onboardingSkip = cy.get(upload_single.dialog_onboardingSkip).as('dialog_onboardingSkip')
                dialog_onboardingSkip.click()
            }
        })

        // Find Document Type
        const list_listJenisNaskahSkp = cy.get(upload_single.list_listJenisNaskahSkp).as('list_listJenisNaskahSkp')
        list_listJenisNaskahSkp.find('div')
            .contains('Sasaran Kinerja Pegawai (SKP)')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleSkp = cy.get(upload_single.list_naskahTitleSkp).as('list_naskahTitleSkp')
        list_naskahTitleSkp.should('contain', 'Sasaran Kinerja Pegawai (SKP)')
            .and('be.visible')

        const btn_uploadFileSkp = cy.get(upload_single.btn_uploadFileSkp).as('btn_uploadFileSkp')
        btn_uploadFileSkp.should('contain', 'Upload')
            .and('be.visible')

        const btn_templateSkp = cy.get(upload_single.btn_templateSkp).as('btn_templateSkp')
        btn_templateSkp.should('contain', 'Template')
            .and('be.visible')

        // Access Upload Single File
        btn_uploadFileSkp.click({ force : true })
            .wait(30000)
            .then((val) => {
                // Begin Save Assertion Data
                cy.readFile(getPreviewData).then((object) => {
                    const createDataToWrite = {
                        upload_file: []
                    }

                    // Construct the sub-object
                    const jenis_naskah_name = {
                        jenis_naskah: 'Sasaran Kinerja Pegawai (SKP)'
                    }

                    // Push the sub-object to the array
                    createDataToWrite.upload_file.push(jenis_naskah_name)

                    // // Write data to the JSON file
                    cy.writeFile(getPreviewData, createDataToWrite)
                })
            })
    }

    goToUploadSingleFileNotaDinas() {
        // Find Document Type
        const list_listJenisNaskahNotaDinas = cy.get(upload_single.list_listJenisNaskahNotaDinas).as('list_listJenisNaskahNotaDinas')
        list_listJenisNaskahNotaDinas.find('div')
            .contains('Nota Dinas')
            .scrollIntoView()

        // Check Detail List
        const list_naskahTitleNotaDinas = cy.get(upload_single.list_naskahTitleNotaDinas).as('list_naskahTitleNotaDinas')
        list_naskahTitleNotaDinas.should('contain', 'Nota Dinas')
            .and('be.visible')

        const btn_draftNotaDinas = cy.get(upload_single.btn_draftNotaDinas).as('btn_draftNotaDinas')
        btn_draftNotaDinas.should('contain', 'Buat Draft')
            .and('be.visible')

        const btn_uploadFileNotaDinas = cy.get(upload_single.btn_uploadFileNotaDinas).as('btn_uploadFileNotaDinas')
        btn_uploadFileNotaDinas.should('contain', 'Upload')
            .and('be.visible')

        const btn_templateNotaDinas = cy.get(upload_single.btn_templateNotaDinas).as('btn_templateNotaDinas')
        btn_templateNotaDinas.should('contain', 'Template')
            .and('be.visible')

        // Access Upload Single File
        btn_uploadFileNotaDinas.click()

        // Begin Save Assertion Data
        cy.readFile(getPreviewData).then((object) => {
            const createDataToWrite = {
                upload_file: []
            }

            // Construct the sub-object
            const jenis_naskah_name = {
                jenis_naskah: 'Nota Dinas'
            }

            // Push the sub-object to the array
            createDataToWrite.upload_file.push(jenis_naskah_name)

            // // Write data to the JSON file
            cy.writeFile(getPreviewData, createDataToWrite)
        })
    }
}