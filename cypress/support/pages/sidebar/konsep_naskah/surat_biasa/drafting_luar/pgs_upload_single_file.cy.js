import upload_single from "../../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_luar/upload_single_file"

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
    }

    checkDetailJenisNaskah(jenis_naskah) {
        const label_headerDocumentType = cy.get(upload_single.label_headerDocumentType).as('label_headerDocumentType')
        label_headerDocumentType.should('contain', jenis_naskah)
    }

    checkDetailButtonKirim() {
        const btn_headerButtonSubmit = cy.get(upload_single.btn_headerButtonSubmit).as('btn_headerButtonSubmit')
        btn_headerButtonSubmit.should('contain', 'Kirim')
            .and('be.visible')
    }

    uploadSingleFile(status) {

        if (status === 'positif') {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/TEMPLATE_SURAT_BIASA.pdf'

            const btn_inputNaskahButtonUploadFile = cy.xpath('(//input[@name="file"])[1]').as('btn_inputNaskahButtonUploadFile')
            btn_inputNaskahButtonUploadFile.attachFile(fileUploadSingleFile)
        } else {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/image_example.jpg'

            const btn_inputNaskahButtonUploadFile = cy.xpath('(//input[@name="file"])[1]').as('btn_inputNaskahButtonUploadFile')
            btn_inputNaskahButtonUploadFile.attachFile(fileUploadSingleFile)

            // Assertion file upload
            const label_fileNotSupport = cy.xpath(upload_single.label_fileNotSupport).as('label_fileNotSupport')
            label_fileNotSupport.should('be.visible')
        }
    }

    checkDataFileUpload() {
        // Assertion file upload
        const label_fileUploadTitle = cy.get(upload_single.label_fileUploadTitle).as('label_fileUploadTitle')
        label_fileUploadTitle.should('contain', 'TEMPLATE_SURAT_BIASA.pdf')

        const label_fileUploadSize = cy.get(upload_single.label_fileUploadSize).as('label_fileUploadSize')
        label_fileUploadSize.should('contain', '434.0 KB')

        const btn_reuploadFile = cy.get(upload_single.btn_reuploadFile).as('btn_reuploadFile')
        btn_reuploadFile.should('be.visible')

        const btn_deleteFile = cy.get(upload_single.btn_deleteFile).as('btn_deleteFile')
        btn_deleteFile.should('be.visible')
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
            .should('contain', 'TEMPLATE_SURAT_BIASA.pdf')

        const dialog_backConfirm = cy.get(upload_single.dialog_backConfirm).first().as('dialog_backConfirm')
        dialog_backConfirm.find('div')
            .find('span')
            .should('contain', 'Ya, hapus file')
            .click()
    }
}